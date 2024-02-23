# Expressjs + MongoDB

## When you use this template, make sure that you CHANGE the author name from package.json file and edit this README.md file.

### 💻 Environment setup for Running Locally

To Use this Starter Template locally, follow these steps:

1. Install [NodeJs](https://www.nodejs.org/), [MongoDB](https://www.mongodb.com) and [MongoDB Compass (optional)](https://www.mongodb.com/products/compass) on your machine.

2. Clone the project repository:

```bash
git clone https://github.com/itsMinar/express-mongodb-starter.git
```

3. Navigate to the project directory.

4. Remove the git initialization (.git) file (don't use powershell) -
   ```sh
   rm -rf .git*
   ```
5. Check is there any updated dependencies available -

   ```sh
   npx npm-check-updates -u
   ```

6. Create `.env` file in the root folder and copy paste the content of `.env.sample`, and add necessary credentials.
7. Install the packages:

```bash
npm install
```

6. Run the project (Development):

```bash
npm run dev
```

7. Access the APIs at the specified endpoints.

## 💻 Deploy on Vercel for Free

### To Deploy this app for free on Vercel, follow these steps:

1. Create `vercel.json` file in the root folder and copy paste the content given bellow:

```bash
{
  "version": 2,
  "builds": [
    {
      "src": "src/index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "src/index.js"
    }
  ]
}
```
