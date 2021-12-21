# Front-End-Capstone

**DO NOT MAKE CHANGES DIRECTLY TO MAIN BRANCH**

### Initial Setup Steps

git clone https://github.com/Team-Quartz/Front-End-Capstone.git

npm install
npm start

##Git Workflow

### Starting a ticket
- git pull origin main
- git checkout -b <ticket name>  **it is important to make branch so that you aren't on the main branch** (this is called cutting a branch)
  
_if you make changes while on main (or the wrong branch), you can cut a new branch before committing - it will save your work so you can push it to your branch_

### Completing a ticket
In terminal
- git commit
- git push origin <ticket name>
  
_if ticket is not complete, you can push an incomplete ticket (just don't make a pull request)_

On GitHub website
- make pull request from <ticket name> to main
- have pull request reviewed by team before merging (pending)
