import { Injectable } from '@angular/core';
import { Apollo, ApolloBase, gql, QueryRef } from 'apollo-angular';
import { DocumentNode } from 'graphql';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private apollo: Apollo) {}

  getDays(range: DateRange, query?: DocumentNode): Observable<any> {
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
    daysQuery.refetch();
    return daysQuery.valueChanges;
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

  editEvent(
    eventId: string,
    fields: { name?: string; begin?: Date; end?: Date; guests?: guest[] },
    query?: DocumentNode
  ): Observable<any> {
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
      variables: fields,
    });
    daysQuery.refetch();
    return daysQuery.valueChanges;
  }

  deleteEvent(event: any) {
    return;
  }
}
