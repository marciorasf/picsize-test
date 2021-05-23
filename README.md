# PicSize Test API

This repo contains the backend of Picsize's admission test.

You can check the live version on [picsize-test](picsize-test.marciorasf.space).

The frontend can be found on [picsize-test-api](https://github.com/marciorasf/picsize-test-web).

The test consisted in creating a tool to simulate a loan for a person. At the end of the simulation, the person could fullfill the loan process. The loans made should be stored on a JSON that can be requested using a backend's endpoint. The endpoint is [/emprestimosSolicitados](https://picsize-test-api.ec2.marciorasf.space/emprestimosSolicitados).

The backend is a REST API implemented in Node.js using Express.js framework.


## How to run locally

1. Clone the repo

```bash
git clone git@github.com:marciorasf/picsize-test-api.git
```

2. Install dependencies

```bash
yarn
```

3. Start the server

```bash
yarn dev
```
