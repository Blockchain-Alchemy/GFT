# GFT - Gaming Framework for Tezos
[![](https://img.shields.io/badge/license-MIT-brightgreen)](LICENSE)

### Summary

This is a robust, flexible and scalable solution that allows game devlopers to take full advantage of the Tezos Blockchain.

# Setup
**GFT** runs on [**node**](https://nodejs.org/en/) and [**Unity LTS version 2020.3**](https://unity.com/releases/editor/qa/lts-releases?version=2020.3). 

Please install them before you begin.
### Install node components
Clone this repo and in terminal enter: 

`nmp install`

This will install required packages.
### Build from Unity
Unity project should be built as WebGL and named `public` - the output `/Build/` directory is placed in the `/public/` folder.

This repo contains an example Unity WebGL Component already built and placed in the `/public/Build/` folder, it shows the basic functionality.

### Build from node
To create an optimized build that can be deployed, in terminal enter:

`npm run build`

### Deploy to Netlify
You can now simpley drag-and-drop the `build` folder to deploy to [netlify](https://app.netlify.com/drop).

# Tutorials - Extended Documentation 
[**GFT Tutorials**](https://blockchain-alchemy.gitbook.io/gft-gaming-framework-for-tezos/)

![WWXTZ Chart](https://user-images.githubusercontent.com/2120817/208210672-6b6dc30d-625d-4ee5-90c7-6221471f652b.jpg)

# Dependencies
