import { User } from "./User";

export interface PaginatedResponse {
  data: User[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}
