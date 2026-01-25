FROM ubuntu:25.10

RUN apt-get update \
  && apt-get install --no-install-recommends --no-install-suggests -y \
    ca-certificates \
    curl \
    git \
    zsh \
  && apt-get clean \
  && rm -fr /var/lib/apt/lists/*

RUN mkdir -p /root/dotfiles \
  && mkdir -p /opt/homebrew/share/zsh-autocomplete \
  && touch /opt/homebrew/share/zsh-autocomplete/zsh-autocomplete.plugin.zsh \
  && chsh -s /bin/zsh

WORKDIR /root/dotfiles

ENV PATH=$PATH:/home/linuxbrew/.linuxbrew/bin

CMD ["/bin/zsh"]
