import { userRequest } from "../requestMethods";

export const imageUpload = async(file) => {
  try {
    await userRequest.post('/upload/image-upload', file);
  } catch (error) {
    console.log(error.message)
  }
};

export const imageDelete = async(fileName) => {
  try {
    await userRequest.delete('/upload/image-delete', {data: {fileName: fileName}});
  } catch (error) {
    console.log(error)
  }
};