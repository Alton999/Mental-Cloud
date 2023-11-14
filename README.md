# Mental Cloud
Welcome to the Mental Cloud repository. Here we are aiming to revoluntionaise the mental healthcare industry with the use of AI. Please note this prototype is not intended to replace the need for real life human interactions and professional help.

## Steps to run 
First you will need to clone the repository
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

Next, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
