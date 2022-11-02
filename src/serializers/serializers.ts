const abstractSerializer = (dict: any, fields: string[]) => {
  const data = Object();
  fields.forEach((key: any) => {
    const k: string = key;
    const v: string = dict[key];
    data[k] = v;
  });
  return data;
};
const userFields: string[] = ["_id", "name", "email", "role"];

const blogFields: string[] = [
  "_id",
  "title",
  "description",
  "createdAt",
  "updatedAt",
];

export const Serializer = {
  userSerializer: (user: any) => abstractSerializer(user, userFields),
  usersSerializer: (users: any) => {
    const data: any[] = [];
    users.forEach((user: any) => {
      data.push(Serializer.userSerializer(user));
    });
    return data;
  },
  blogSerializer: (blog: any) => abstractSerializer(blog, blogFields),
  blogsSerializer: (blogs: any) => {
    const data: any[] = [];
    blogs.forEach((blog: any) => {
      data.push(Serializer.blogSerializer(blog));
    });
    return data;
  },
};
