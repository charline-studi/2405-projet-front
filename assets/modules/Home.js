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
        const recentsProjects = response.data.slice(-3)
        // URL pour récupérer les langages d'un projet :
        // https://api.github.com/repos/charline-studi/{nom-du-repo}/languages
        for (let i = 0; i < recentsProjects.length; i++) {
            const languagesUrl = recentsProjects[i].languages_url
            const cleanedUrl = languagesUrl.replace("https://api.github.com", "")
            const responseLanguages = await octokit
                .request(`GET ${cleanedUrl}`)
                .catch((error) => {
                    console.log("ERREUR lors de l'appel api getReposInformations - langages", error)
                })
            const projectLanguages = responseLanguages.data
            recentsProjects[i].languages = projectLanguages
        }
        this.updateHTMLProjects(recentsProjects)
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
            this.createHTMLLanguageTag(this.projectsTagsContainer[i], project.languages)
            htmlIndex++
        }
    }

    createHTMLLanguageTag(div, languages) {
        const arrayLanguages = Object.keys(languages)
        for (let i = 0; i < arrayLanguages.length; i++) {
            // Création dynamique
            const span = document.createElement('span')
            span.textContent = arrayLanguages[i]
            div.appendChild(span)
            // Création par chaîne de charactère : moins manipulable
            // const spanRaw = `<span class="${}">${arrayLanguages[i]}</span>`
            // div.innerHTML += spanRaw
        }
    }
}

export { Home }