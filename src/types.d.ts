import { Time } from '@angular/common';

declare global {
  interface User {
    name: string;
    password: string;
  }

  type sizing = 25 | 50 | 75 | 100 | 'auto';

  type alert =
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark'
    | '';

  type size =
    | '1'
    | '2'
    | '3'
    | '4'
    | '5'
    | '6'
    | '7'
    | '8'
    | '9'
    | '10'
    | '11'
    | '12'
    | 'auto'
    | '';

  type align = 'start' | 'center' | 'end' | '';

  type breakpoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | '';

  type color =
    | 'primary'
    | 'secondary'
    | 'success'
    | 'info'
    | 'warning'
    | 'danger'
    | 'light'
    | 'dark'
    | '';

  type corner = 'top' | 'end' | 'bottom' | 'start' | '';

  type justifyContent =
    | 'start'
    | 'center'
    | 'end'
    | 'around'
    | 'between'
    | 'evenly'
    | '';

  type justifyContentBreakpoint = {
    [key in breakpoints]?: justifyContent;
  };

  type columnsBreakSize = {
    [key in breakpoints]?: size;
  };

  type user = {
    id: string;
    name: string;
  };

  type guest = {
    user: user;
    confirmation?: boolean | 'awaiting';
  };

  type DateRange = {
    begin: Date;
    end: Date;
  };

  type dateEvent = {
    id: string;
    name: string;
    begin: Date;
    end: Date;
    guests?: guest[];
  };

  type day = {
    date: Date;
    events?: dateEvent[];
  };
}
