
# Zapier - Workflow Automation Platform

Zapier is a tool to automate workflows, enabling users to streamline tasks and boost productivity. It simplifies the process of connecting apps and automating tasks by setting up triggers and actions. The platform currently supports webhook as a trigger and offers actions like sending emails and transferring Solana tokens. When a trigger is activated, the corresponding actions are executed, making workflow automation seamless and efficient.

## Tech Stack
- **Node.js**
- **Express**
- **TypeScript**
- **PostgreSQL with Prisma**
- **Kafka with KafkaJS**
- **Next.js**
- **TailwindCSS**

## Features
- **Webhook Trigger**: Allows external services to trigger actions through webhooks.
- **Send Email Action**: Automatically sends emails based on trigger events.
- **Send Solana Action**: Transfers Solana tokens as part of automated workflows.

## Installation

1. **Clone the Repository**:
   ```bash
   git clone <repo_link>
   ```

2. **Navigate to the Project Directory**:
   ```bash
   cd <project_directory>
   ```

3. **Install Dependencies**:
   For each of the following folders (`frontend`, `hooks`, `primary-backend`, `processor`, `worker`), run:
   ```bash
   npm install
   ```

4. **Set Up Environment Variables**:
   - Copy the `.env.example` file in each folder and rename it to `.env`.
   - Fill in the necessary environment variables in each `.env` file (details below).

5. **Run the Project**:
   - For all folders except `frontend`, start the servers with:
     ```bash
     npm start
     ```
   - For the `frontend`, use:
     ```bash
     npm run dev
     ```

6. **Ports**:
   The ports for all services remain unchanged. Please ensure no conflicts with existing services on your machine.

## Folder Structure

```
├── README.md
├── frontend
├── hooks
├── primary-backend
├── processor
└── worker
```

- **frontend**: Contains the Next.js frontend for the project, started with `npm run dev`.
- **hooks**: Handles webhook triggers for external services.
- **primary-backend**: The main backend logic to create and publish workflows.
- **processor**: Picks up zaps from the database and pushes them to the Kafka queue.
- **worker**: Picks up zaps from the queue and calls third-party services to perform actions.

## Setup Instructions

Before running the project, ensure you have the following services set up:

### 1. PostgreSQL Database
   - Install and configure a PostgreSQL database for the project.
   - You can follow the official PostgreSQL installation guide here:  
     [PostgreSQL Documentation](https://www.postgresql.org/docs/)

### 2. Kafka Instance

#### Start Kafka Locally
Refer to the [official Kafka quickstart guide](https://kafka.apache.org/quickstart).

#### Using Docker:
Start Kafka using Docker:
```bash
docker run -p 9092:9092 --rm apache/kafka:3.7.1
```

#### Get Shell Access to the Kafka Container:
1. List all running containers:
   ```bash
   docker ps
   ```

2. Get shell access to the Kafka container (replace `container_id` with the actual container ID from the previous command):
   ```bash
   docker exec -it <container_id> /bin/bash
   ```

3. Navigate to the Kafka binary folder:
   ```bash
   cd /opt/kafka/bin
   ```

#### Create a Kafka Topic:
```bash
./kafka-topics.sh --create --topic outbox-processor --bootstrap-server localhost:9092
```

#### Publish to the Topic:
```bash
./kafka-console-producer.sh --topic outbox-processor --bootstrap-server localhost:9092
```

For more information, refer to the Kafka quickstart guide for installation and configuration:  
[Apache Kafka Documentation](https://kafka.apache.org/quickstart)

### 3. SMTP Credentials (Mailgun or Amazon SES)
   - For email functionalities, you'll need SMTP credentials.
   - Mailgun setup guide: [Mailgun Documentation](https://documentation.mailgun.com/en/latest/)
   - Amazon SES setup guide: [Amazon SES Documentation](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/Welcome.html)

### 4. Solana Private Key
   - To enable Solana token transfers, you'll need a Solana private key.
   - You can generate one using the Solana CLI. Refer to the documentation for setup:  
     [Solana Documentation](https://docs.solana.com/cli/install-solana-cli-tools)

Once these services are configured and running, ensure the respective credentials and connection strings are added to the `.env` files in the appropriate directories.

## System Design

The overall architecture and workflow for this system can be viewed in the system design flowchart below:

[System Design Flowchart](https://lucid.app/lucidchart/bc168a94-3730-4c21-b5ea-44d51d5e41eb/edit?viewport_loc=-725%2C-862%2C3759%2C2149%2C0_0&invitationId=inv_74fbcb0f-bea8-41fd-921b-3408cf4cd5a9)

## Contribution Guidelines

### Guidelines
- Make a single commit per pull request and use a meaningful commit message. For example: Adding <your-name> to the contributors section.
- Reference the issue number in your commit message if it resolves an open issue. Use the format: Issue: <ISSUE NUMBER>.
- Provide a screenshot or a link to the live project if relevant to make it easier to review.
- Avoid duplicate pull requests. If you need to follow up on a pull request, comment on the original and close the obsolete PR.


---