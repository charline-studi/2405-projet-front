import { Octokit } from "https://esm.sh/octokit"
class Home {

    constructor(){
        this.descriptionHTML = document.querySelector('.js-home-description')
        this.profilHTML = document.querySelector('.js-home-profil-url')
        this.avatarHTML = document.querySelector('.js-home-avatar')

        this.projectsTitle = document.querySelectorAll('.js-home-project-title')
        this.projectsDescription = document.querySelectorAll('.js-home-project-description')
        this.projectsTagsContainer = document.querySelectorAll('.js-home-project-tags-container')

        this.init()
    }

    init() {
        this.getUserInformations()
        this.getReposInformations()
    } 

    getUserInformations() {
        // API façon #1 : Récupérer le contenu avec un fetch
        fetch("https://api.github.com/users/charline-studi")
            .then((response) => response.json())
            .then((data) => {
                this.updateHTMLUser(data)
            })
            .catch((error) => {
                console.log("ERREUR lors de l'appel api getUserInformations", error)
            })
    } 

    async getReposInformations() {
        // API façon #2 : Récupérer le contenu avec l'Octokit JS et avec "await / async"
        // URL de l'API clasisque : https://api.github.com/users/charline-studi/repos
        const octokit = new Octokit()
        const response = await octokit
            .request("GET /users/charline-studi/repos")
            .catch((error) => {
                console.log("ERREUR lors de l'appel api getReposInformations", error)
            })
        this.updateHTMLProjects(response.data)
    } 

    updateHTMLUser(APIdata) {
        // Afficher la description de mon profil Github
        this.descriptionHTML.textContent = APIdata.bio
        // Afficher l'url de mon profil github
        this.profilHTML.setAttribute("href", APIdata.html_url)
        // Afficher mon avatar
        this.avatarHTML.setAttribute("src", APIdata.avatar_url)
    }

    updateHTMLProjects(projects) {
        const maxIndex = projects.length - 1
        let htmlIndex = 0
        for(let i = maxIndex; i > maxIndex - 3; i--){
            const project = projects[i]
            this.projectsTitle[htmlIndex].textContent = project.name
            this.projectsDescription[htmlIndex].textContent = project.description
            const languages = project.topics
            console.log(languages)
            htmlIndex++
        }
    }
}

export { Home }