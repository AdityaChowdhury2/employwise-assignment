// lib/api.ts

type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
};

type PaginatedResponse = {
  data: User[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * Fetches paginated users from the API
 * @param page The page number to fetch
 * @param perPage Number of items per page
 * @returns Promise with paginated user data
 */
export async function getPaginatedUsers(
  page: number = 1
  // options?: {
  //   cache: RequestCache;
  // }
): Promise<{
  users: User[];
  totalPages: number;
  currentPage: number;
}> {
  try {
    const url = new URL(`${API_BASE_URL}/api/users?page=${page}`);
    url.searchParams.append("page", page.toString());

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // cache: "force-cache", // cache on for static generation
      // cache: "no-store", // Uncomment for SSR to prevent caching
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: PaginatedResponse = await response.json();

    return {
      users: data.data,
      totalPages: data.total_pages,
      currentPage: data.page,
    };
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw error; // Re-throw to handle in the calling component
  }
}

export async function updateUserById(user: Partial<User>, id: string) {
  try {
    const url = new URL(`${API_BASE_URL}/api/users/${id}`);

    const response = await fetch(url.toString(), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: User = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to update user:", error);
    throw error;
  }
}

export async function deleteUserById(id: string) {
  try {
    const url = new URL(`${API_BASE_URL}/api/users/${id}`);

    const response = await fetch(url.toString(), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error("Failed to delete user:", error);
    throw error;
  }
}
