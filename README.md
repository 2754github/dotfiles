# dotfiles

For macOS (Apple Silicon).

1. [システム設定](./other/システム設定.md)
1. Run the following commands

   ```sh
   cd $HOME
   mkdir -p $HOME/.ssh
   ssh-keygen -t ecdsa -N '' -f $HOME/.ssh/github
   pbcopy < $HOME/.ssh/github.pub
   ```

1. Register the key > <https://github.com/settings/keys>
1. Run the following commands

   ```sh
   git clone git@github.com:2754github/dotfiles.git
   $HOME/dotfiles/setup
   $HOME/dotfiles/doctor
   ```
