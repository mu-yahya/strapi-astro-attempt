import {defineAction } from "astro:actions";
import {z} from "astro:schema";

import { mutateData } from "../utils/mutate-data";

interface Payload {
  data: {
    Title: string;
    Price: number;
    Product_Id: string;
  };
}

export const server = {
  addProduct: defineAction({
    //accept: "form",
      input: z.object({
      data: z.object({
        title:z.string(),
        price:z.number(),
        productId:z.number(),
      })
    }),

    handler: async (formData:any) => {
      // insert comments in db
      console.log(formData);

      const payload: Payload = {
        data: {
          Price: formData.data.price,
          Title: formData.data.title,
          Product_Id: formData.data.productId
        },
      };

      const responseData = await mutateData("POST", "/api/products", payload);

      if (!responseData) {
        return {
          strapiErrors: null,
          message: "Oops! Something went wrong. Please try again.",
        };
      }

      else if (responseData.error) {
        return {
          strapiErrors: responseData.error,
          message: "Failed to Register.",
        };
      }

      else return {
        message: "Form submitted, thank you.",
        data: responseData,
        strapiErrors: null,
      };
    },

    
  }),



  registerUser: defineAction({
    //accept: "form",
      input: z.object({
      data: z.object({
        username:z.string(),
        email:z.string(),
        password:z.string(),
      })
    }),

    handler: async (formData:any) => {
      // insert comments in db

      const responseData = await mutateData("POST", "/api/users", {...formData.data, role:0});

      if (!responseData) {
        return {
          strapiErrors: null,
          message: "Oops! Something went wrong. Please try again.",
        };
      }

      else if (responseData.error) {
        return {
          strapiErrors: responseData.error,
          message: "Failed to Register.",
        };
      }

      else return {
        message: "Form submitted, thank you.",
        data: responseData,
        strapiErrors: null,
      };
    },
  }),

  login: defineAction({
    //accept: "form",
      input: z.object({
      data: z.object({
        identifier:z.string(),
        password:z.string(),
      })
    }),

    handler: async (formData:any) => {
      // insert comments in db

      const responseData = await mutateData("POST", "/api/auth/local", {...formData.data});

      if (!responseData) {
        return {
          strapiErrors: null,
          message: "Oops! Something went wrong. Please try again.",
        };
      }

      else if (responseData.error) {
        return {
          strapiErrors: responseData.error,
          message: "Failed to Register.",
        };
      }

      else {
        
        //localStorage.setItem("token",responseData[3])
        //sessionStorage.setItem("token",responseData[3])
        if (typeof window !== 'undefined') {
          localStorage.setItem("token","responseData.data[3]")
      }
      //const jwt = responseData.stringify

      //if (responseData)
        return {
        message: "Form submitted, thank you",
        data: responseData,
        //jwt: jwt,
        strapiErrors: null,
      }};
    },
  }),

};