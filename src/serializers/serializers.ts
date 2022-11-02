const Serializer = (dict: any, fields: string[]) => {
  const data = Object();
  fields.forEach((key: any) => {
    const k: string = key;
    const v: string = dict[key];
    data[k] = v;
  });
  return data;
};
const userFields: string[] = ["name", "email"];
export const userSerializer = (user: any) => Serializer(user, userFields);

const blogFields: string[] = [
  "_id",
  "title",
  "description",
  "createdAt",
  "updatedAt",
];
export const blogSerializer = (blog: any) => Serializer(blog, blogFields);
export const blogsSerializer = (blogs: any) => {
  const data: any[] = [];
  blogs.forEach((blog: any) => {
    data.push(blogSerializer(blog));
  });
  return data;
};
