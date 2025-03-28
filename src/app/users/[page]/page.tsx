import Pagination from "@/components/Pagination";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import UserRows from "@/components/UserRows";
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
  const { users: UsersFromApi, totalPages } = await getPaginatedUsers(
    currentPage
  );

  console.log(UsersFromApi, "UsersFromApi");

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          {UsersFromApi.length > 0 ? (
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
                <UserRows users={UsersFromApi} />
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-4">
              <p className="text-gray-500">No users found.</p>
            </div>
          )}
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
