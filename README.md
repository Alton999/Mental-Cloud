This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Mental Cloud
Welcome to the Mental Cloud repository. Here we are aiming to revoluntionaise the mental healthcare industry with the use of AI. Please note this prototype is not intended to replace the need for real life human interactions and professional help.

# Steps to run 
First you will need to close the repository
```
git clone https://github.com/Alton999/Mental-Cloud.git
```

Next you will need to install the relevant packages.
In the terminal navigate to the Mental-Cloud repository
```
npm install
``` 
You will then need to add the needed API keys.
Create a file 
```
.env.local
```

And add the following keys:
```
OPENAI_API_KEY="***"
PINECONE_API_KEY="***"
PINECONE_ENVIRIONMENT="***"
```


First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
