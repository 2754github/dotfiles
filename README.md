# dotfiles

## Setup

For macOS (Apple Silicon)

1. Run the following commands

   ```sh
   cd $HOME
   mkdir -p $HOME/.ssh
   ssh-keygen -t ed25519 -N '' -f $HOME/.ssh/github
   pbcopy < $HOME/.ssh/github.pub
   ```

1. Register the key > <https://github.com/settings/keys>
1. Run the following commands

   ```sh
   cd $HOME
   xcode-select --install
   curl -o $HOME/.ssh/config https://raw.githubusercontent.com/2754github/dotfiles/main/home/.ssh/config
   git clone git@github.com:2754github/dotfiles.git
   rm $HOME/.ssh/config
   $HOME/dotfiles/run setup
   source $HOME/.zprofile
   source $HOME/.zshrc
   $HOME/dotfiles/run doctor
   ```

1. [Others](others/)

## Test

```sh
echo 'brew "mise"\nbrew "starship"' > $HOME/dotfiles/Brewfile
$HOME/dotfiles/scripts/test
$HOME/dotfiles/run setup
source $HOME/.zshrc
$HOME/dotfiles/run doctor
exit
git restore $HOME/dotfiles/Brewfile
```
