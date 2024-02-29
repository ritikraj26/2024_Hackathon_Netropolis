# Revitalizing Rural Japan: Bridging Communities for Sustainable Growth

## Table of Contents
- [Revitalizing Rural Japan: Bridging Communities for Sustainable Growth](#revitalizing-rural-japan-bridging-communities-for-sustainable-growth)
  - [Table of Contents](#table-of-contents)
  - [Background of the Hackathon](#background-of-the-hackathon)
  - [Features Provided by Us](#features-provided-by-us)
  - [Issues and Solution](#issues-and-solution)
    - [LLM and Vector DB for Quest Search:](#llm-and-vector-db-for-quest-search)
  - [Hackathon Goals](#hackathon-goals)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Schema](#schema)
  - [Technologies Used](#technologies-used)
  - [Team Members](#team-members)

## Background of the Hackathon

Japan's aging population, declining birthrate, and shrinking rural workforce threaten the preservation of local economies, culture, and heritage. This project addresses these challenges. 

## Features Provided by Us

* Distinct user/community manager login
* Location-centric quest registration 
* User-friendly quest scheduling 
* LLM-enhanced quest search
* Streamlined quest request system

## Issues and Solution

* **Local Issues:** Labor shortages impact farms, forests, and cultural preservation. Communities seek individuals who resonate with their values.
* **User Issues:** People want to support rural areas but need trial experiences before relocating. 
* **Solution:** A platform matching short-term, meaningful work with immersive rural experiences, connecting users to communities with shared values.

### LLM and Vector DB for Quest Search:

Our project aims to develop a sophisticated semantic search system by harnessing the capabilities of `PostgreSQL's vector database` and `Hugging Face's Sentence-Transformers model (all-MiniLM-L6-v2)`. We seek to enable users to retrieve relevant information based on the semantic context of their queries rather than relying solely on keyword matching. Our proposed workflow involves:
- Preprocessing raw text data.
- Encoding sentences into high-dimensional vector representations.
- Storing them efficiently in the database.

When users enter search queries, we encode them into vectors, retrieve stored embeddings, and calculate their semantic similarity using L2 distance. The top-k most relevant search results are then returned to the user, enhancing the overall search experience. Our project promises to deliver a scalable, accurate, and context-aware search solution with the potential for further optimization and integration into various domains and applications.


## Hackathon Goals

Develop core platform functions to foster revitalization and user engagement through a "quest" system combining work, culture, and leisure.

* **Specific Functionality:**
    * Secure login (user and community manager)
    * Intuitive location-based quest registration
    * User-friendly quest scheduling tools
    * LLM-powered search for optimized results
    * Streamlined quest request process

## Installation

**Frontend** 
* Modify `client/.env` and enter the backend URL.
* `npm install`
* `npm start`

**Backend**
* `pip install -r requirements.txt`
* `python manage.py runserver`

## Usage

* **Log in/Sign up:** Use credentials, with separate access for users and community managers.
* **Quest Registration:** Community managers register quests based on location. 
* **Scheduling:** Users view quests in their location using scheduling tools.
* **Search:** Find quests aligned with preferences using the LLM-powered search.
* **Request:** Users submit quest requests.


## Schema

![Database Schema](./client/public/schema.png)


## Technologies Used

* **Design:** Figma
* **Front-end:** React
* **Back-end:** Django
* **Database:** PostgreSQL

## Team Members

* Mohammad Shehar Yaar Tausif
* Rohan Raju Meshram
* Ritik Raj

