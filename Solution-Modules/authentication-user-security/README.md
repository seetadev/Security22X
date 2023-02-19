# User security, authentication using Arcana for Transport Monitor Roles

We are extending the Arcana demo app for utilizing the user security and authentication, storage methods with capabilities pluggable and extendable to 5 different personas: Driver, Police, Citizen, Dispatcher, Admin. Arcana enables 360 degrees access of the incidents to the action/ administration team. They can manage the complete lifecycle of incident reporting, overall status, traffic monitoring, managing police teams. They can also use the solution for effective user security of staff members and provide road safety counselling. The Sample Demo App demonstrates how a dApp can utilize Arcana Auth and Storage SDK for quickly onboarding dApp users and enable user data privacy.


## 💪 Key Features

* <p>⚙️ &nbsp; Integrates with Arcana Network SDKs
  <p><ul>
  <li>Auth SDK</li>
  <li>Storage SDK</li>
  </ul></p>

* <p>🗝️ &nbsp; Uses social authentication feature of Auth SDK to enable user onboarding via Google OAuth.</p>

* <p>👛 &nbsp;Assigns Arcana wallet address for each authenticated user, internally. User doesn't have to necessarily set up and use a wallet explicitly.</p>

* <p>🗄️ &nbsp; Allows dApp users to upload their data in Arcana Store for access control and privacy.</p>

* <p>📂 &nbsp; Enables dApp users full ownership and control of their data residing in Arcana Store. Only data owners can download, share, revoke access, delete or transfer data ownership to another user.</p>

## 🌐 Public Deployment

You can try out Arcana Network Drive here: [https://demo.arcana.network](https://demo.arcana.network)

## ⚙️ Installation

### Local Development

**Prerequisites:** You'll need an up to date **`node.js`** and **`npm`** installed in your system for this demo to work. Use LTS v16 or higher.

#### Clone the repository

```bash
git clone <repo-url>
```

#### Install Dependencies

- Install package dependencies

```bash
npm install
```

#### Setup Environment Variables

- Create `.env` file in root and copy the content of `.env.example`.

```bash
cp .env.example .env
```

**Replace all variable values with actual environment variables**

- To run the project in development environment

```bash
npm run dev
```

#### Build and Run

- To build the project for production (to generate static files for hosting)

```bash
npm run build
```
### Docker: Local Development

**Prerequisites:**

- [Docker](https://docs.docker.com/engine/install/)

#### Clone the Repository

```
git clone git@github.com:arcana-network/demo-app.git
```

#### Setup Container Environment

```
cp .env.example .env
```

#### Build and Run

Run local environment with demo-app

```
make run-local
```
## 📚 Usage

Check out the [Demo App Usage Guide](https://docs.arcana.network/docs/demo-app) for usage details.

For other code samples and templates to help developers speed up Arcana SDK integration, visit [Code Samples](https://docs.beta.arcana.network/docs/overview_cs) section of Arcana Network documentation.

## 💡 Support

For any support or integration related queries, contact the [Arcana Support Team](mailto:support@arcana.network).

## 🤝 Contributing Guide

We welcome all contributions to this public repository from the community.

Read our [contributing guide](https://github.com/arcana-network/license/blob/main/CONTRIBUTING.md) to learn more about the our development process, how to propose bug fixes and improvements, and the code of conduct that we expect the participants to adhere to.

## ℹ️ License

This public repository from Arcana Network is distributed under the [MIT License](https://fossa.com/blog/open-source-licenses-101-mit-license/).

For details see [Arcana License](https://github.com/arcana-network/license/blob/main/LICENSE.md).
