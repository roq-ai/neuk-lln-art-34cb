import { UserInterface } from 'interfaces/user';
import { ArtLocationInterface } from 'interfaces/art-location';
import { GetQueryInterface } from 'interfaces';

export interface TodoListInterface {
  id?: string;
  user_id?: string;
  art_location_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  art_location?: ArtLocationInterface;
  _count?: {};
}

export interface TodoListGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  art_location_id?: string;
}
