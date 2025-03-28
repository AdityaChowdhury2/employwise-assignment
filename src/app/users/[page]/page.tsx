import Pagination from "@/components/Pagination";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import UserRow from "@/components/UsersRow";
import { User } from "@/interface/User";
import { getPaginatedUsers } from "@/lib/api";

type Params = Promise<{ page: string }>;

// Pre render first 2 pages at build time
export async function generateStaticParams(): Promise<Array<{ page: string }>> {
  return [{ page: "1" }, { page: "2" }];
}

// Revalidate every hour for incremental static regeneration
export const revalidate = 3600;

const UsersPage = async (props: { params: Params }) => {
  // Properly await the params by using them directly in the async function
  const { page } = await props.params;
  const currentPage = parseInt(page);
  const { users, totalPages } = await getPaginatedUsers(currentPage);

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Avatar</TableHead>
                <TableHead>First Name</TableHead>
                <TableHead>Last Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user: User) => (
                <UserRow key={+user.id} user={user} />
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <div className="flex justify-center items-center space-x-2 mt-4">
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          basePath="/users"
        />
      </div>
    </div>
  );
};

export default UsersPage;
