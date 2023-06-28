import { TodoListInterface } from 'interfaces/todo-list';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface ArtLocationInterface {
  id?: string;
  name: string;
  category: string;
  description?: string;
  image?: string;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;
  todo_list?: TodoListInterface[];
  organization?: OrganizationInterface;
  _count?: {
    todo_list?: number;
  };
}

export interface ArtLocationGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  category?: string;
  description?: string;
  image?: string;
  organization_id?: string;
}
