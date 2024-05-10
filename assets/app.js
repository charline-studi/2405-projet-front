import { Octokit } from "https://esm.sh/octokit"

const octokit = new Octokit({})
// octokit.rest.repos => provient du SDK
// get => Méthode du SDK pour récupérer ici les repos
octokit.rest.repos
    .get({
        owner:"charline-studi",
        repo:"2405-projet-front",
    })
    .then(({ data }) => {
        console.log("Repo récupéré", data)
        console.log(data.url)
    })