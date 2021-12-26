# Front-End-Capstone

**DO NOT MAKE CHANGES DIRECTLY TO MAIN BRANCH**

### Initial Setup Steps

`git clone https://github.com/Team-Quartz/Front-End-Capstone.git`

`npm install`
`npm start`

##Git Workflow

### frequently (any time anyone merges changes, or when you start a new ticket)

- `git checkout main`
- `git pull origin main`

### Starting work on a ticket
- `git checkout main` (to make sure your new branch is based off of main)
- `git checkout -b <ticket-name>`
  - **it is important to make branch so that you aren't on the main branch** (this is called cutting a branch)
  - `<firstname>/<ticket-name>`
    - e.g. `liam/crash-when-opening-page`

_if you make changes while on main (or the wrong branch), you can cut a new branch before committing - it will save your work so you can push it to your branch_

### Completing a ticket
In terminal
- `git add <all the files you changed>`
- `git commit` <- please do many regular, granular commits with clear names!
- `git push origin <ticket name>`

_if ticket is not complete, you can push an incomplete ticket (just don't make a pull request)_

On GitHub website
- make pull request from <ticket name> to main
- have pull request reviewed by team before merging (pending)
- keep pull request open until resolved by team member
- when resolved and ready to merge, the person who's pull request it is will hit the merge button
- in the event of merge conflicts, the person who's pull request it is should:
  - `git checkout main`
  - `git pull origin main`
  - `git checkout <branch-name>`
  - `git merge main`
  - resolve conflicts in editor (consult team if necessary)
  - `git add <changed files>`
  - `git commit` ('resolve conflicts')
  - `git push origin <branch-name>`
  - return to pull request on website (should be auto-updated)
  - merge
