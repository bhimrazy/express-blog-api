const Serializer = (dict: any, fields: String[]) => {
  let data = Object();
  fields.forEach((key: any) => {
    const k: string = key;
    const v: string = dict[key];
    data[k] = v;
  });
  return data;
};
const userFields: String[] = ["name", "email"];
export const userSerializer = (user: any) => Serializer(user, userFields);

const blogFields: String[] = [
  "_id",
  "title",
  "description",
  "createdAt",
  "updatedAt",
];
export const blogSerializer = (blog: any) => Serializer(blog, blogFields);
export const blogsSerializer = (blogs: any) => {
  var data: any[] = [];
  blogs.forEach((blog: any) => {
    data.push(blogSerializer(blog));
  });
  return data;
};
