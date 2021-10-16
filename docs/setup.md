# Development Setup

### Installing prerequisites

#### Yarn

Please refer to their [installation guide](https://yarnpkg.com/en/docs/install).

#### Docker

##### MacOS

```sh
brew install --cask docker
```

##### Linux

```sh
sudo apt update
sudo apt install apt-transport-https ca-certificates curl gnupg-agent software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io
```

### Installing Devparty

1. Fork Devparty's repository, e.g. <https://gitlab.com/yo/devparty/-/forks/new>
2. Clone your forked repository in one of two ways:

   - e.g. with HTTPS: `git clone https://gitlab.com/<your-username>/devparty.git`
   - e.g. with SSH: `git clone git@gitlab.com:<your-username>/devparty.git`

3. Set up your environment variables/secrets

   - Take a look at `.env.example` to see all the `ENV` variables we use and the
     fake default provided for any missing keys.
   - If you use a remote computer as dev env, you need to set `BASE_URL`
     variable to the remote computer's domain name.
   - For any key that you wish to enter/replace, follow the steps below.

     1. Create `.env` by copying from the provided template (i.e. with bash:
        `cp .env.example .env`). This is a personal file that is ignored in git.
     2. Obtain the development variable and apply the key you wish to
        enter/replace. i.e.:

     ```sh
      export GITHUB_CLIENT_ID="SOME_REAL_SECURE_KEY_HERE"
      export GITHUB_CLIENT_SECRET="ANOTHER_REAL_SECURE_KEY_HERE"
     ```

   - You do not need "real" keys for basic development. Some features require
     certain keys, so you may be able to add them as you go.

4. Run `yarn install`
5. Run `docker-compose up`
6. Setup database

   - Set `DATABASE_URL="mysql://root:devparty@localhost:33060/devparty"`
     this points to Docker's link
   - Migrate the migration to database by running `yarn prisma:migrate`
   - Seed the fake data to the database by running `yarn prisma:seed`

7. Run `yarn dev` and visit http://localhost:3000/
