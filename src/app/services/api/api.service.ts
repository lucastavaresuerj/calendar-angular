import { Injectable } from '@angular/core';
import { Apollo, ApolloBase, gql, QueryRef } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private apollo: Apollo) {}

  getDaysQuery(
    range?: DateRange,
    query?: DocumentNode
  ): QueryRef<
    any,
    {
      range: DateRange;
    }
  > {
    if (!range) {
      const date = new Date();
      range = {
        begin: date,
        end: new Date(new Date(date).setDate(date.getDate() + 15)),
      };
    }

    if (!query) {
      query = gql`
        query Query($range: DateRange!) {
          days: userEvents(range: $range) {
            date
            events {
              id
              begin
              end
              name
              owner {
                name
                id
              }
              guests {
                user {
                  name
                  id
                }
                confirmation
              }
            }
          }
        }
      `;
    }
    const daysQuery = this.apollo.watchQuery({
      query,
      variables: { range },
    });
    return daysQuery;
  }

  getUsers(): Observable<any> {
    return this.apollo.watchQuery({
      query: gql`
        query Query {
          users {
            id
            name
          }
        }
      `,
    }).valueChanges;
  }

  createEvent(
    event: {
      name: string;
      begin: Date;
      end: Date;
      guests?: guest[];
    },
    mutation?: DocumentNode
  ): Observable<any> {
    if (!mutation) {
      mutation = gql`
        mutation Mutation($event: EventCreate) {
          createEvent(event: $event) {
            id
            name
            owner {
              id
              name
            }
            begin
            end
            guests {
              user {
                id
                name
              }
              confirmation
            }
          }
        }
      `;
    }
    return this.apollo.mutate({
      mutation,
      variables: { event },
    });
  }

  editEvent(
    eventId: string,
    event: {
      name?: string;
      begin?: Date;
      end?: Date;
      guests?: guest[];
    },
    mutation?: DocumentNode
  ): Observable<any> {
    if (!mutation) {
      mutation = gql`
        mutation Mutation($event: EventEdit) {
          editEvent(event: $event) {
            id
            name
            owner {
              id
              name
            }
            begin
            end
            guests {
              user {
                id
                name
              }
              confirmation
            }
          }
        }
      `;
    }
    return this.apollo.mutate({
      mutation,
      variables: { event: { ...event, id: eventId } },
    });
  }

  deleteEvent(eventId: string, mutation?: DocumentNode): Observable<any> {
    if (!mutation) {
      mutation = gql`
        mutation DeleteEvent($event: EventInput) {
          deleteEvent(event: $event) {
            id
            name
            owner {
              id
              name
            }
            begin
            end
            guests {
              user {
                id
                name
              }
              confirmation
            }
          }
        }
      `;
    }
    return this.apollo.mutate({
      mutation,
      variables: { event: { id: eventId } },
    });
  }

  changeGuestResponse(
    eventId: string,
    confirmation: confirmation,
    mutation?: DocumentNode
  ): Observable<any> {
    if (!mutation) {
      mutation = gql`
        mutation Mutation($guest: GuestEditStatus) {
          changeConfirmation(guest: $guest) {
            user {
              id
              name
            }
            confirmation
          }
        }
      `;
    }
    return this.apollo.mutate({
      mutation,
      variables: { guest: { event: { id: eventId }, confirmation } },
    });
  }
}
