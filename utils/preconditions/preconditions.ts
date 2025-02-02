import * as data from "../../testData/users.data";

export async function deleteUsers(request: { delete: (arg0: string) => any; }) {
    await request.delete(`/api/users/`);
}

export async function createUsers(request: { post: (arg0: string, arg1: { data: { firstName: string; lastName: string; age: number; }; }) => any; }) {
    for (const user of data.users) {
        await request.post(
            `/api/users/`,
            {data: user}
        )
    }
}