# ToolChain


* arch packages
** yay
#+begin_src shell
sudo pacman -Sy --needed git base-devel && git clone https://aur.archlinux.org/yay.git && cd yay && makepkg -si
#+end_src

** essentials
#+begin_src shell
sudo pacman -Sy --noconfirm --needed \
     git \
     base-devel \
     xorg \
     yajl \
     stow \
     xinit \
     kitty \
     rofi \
     ttf-dejavu \
     ttf-sourcecodepro-nerd
#+end_src


** development
*** extensive
#+begin_src shell
yay -S --noconfirm \
     networkmanager \
     wget \
     linux-headers \
     cmake \
     boost \
     gdb \
     ctags \
     global \
     cpio \
     pahole \
     grub \
     ripgrep \
     libgccjit \
     libvirt \
     virt-manager \
     virt-install \
     bridge-utils \
     qemu-full \
     docker \
     ntfs-3g \
     llvm \
     clang \
     go \
     rustup \
     ant \
     lib32-glibc \
     maven \
     graphviz \
     termdown \
     pfetch \
     screenkey \
     opam # ocaml package manageer


pip install epc  \
            six  \
            pyright  \
            ipython  \
            matplotlib  \
            networkx  \
            pygments
#+end_src

** personal packages
#+begin_src shell
yay -S --noconfirm \
     nitrogen \
     google-chrome \
     discord \
     dunst \
     zoom \
     slack-desktop \
     flameshot \
     btop \
     isync \
     msmtp \
     fastfetch \
     pipewire-pulse \
     pavumeter \
     pavucontrol \
     alsa-utils \
     paprefs \
     pasystray \
     hugo \
     fzf \
     exa \
     pandoc \
     wezterm \
     chafa \
     perl-image-exiftool \
     giflib \
     starship \
     rofi-lbonn-wayland \
     words \
     stow \
     vlc \
     tree-sitter \
     ibus-rime \
     nemo \
     autojump \
     krita \
     picom \
     mu \
     aspell \
     aspell-en \
     texlive-bin \
     texlive-binextra \
     radare2 \
     ghidra \
     git-delta \
     screenkey \
     volnoti \
     sayonara-player \
     pypy3 \
     inkscape \
     ggtags \
     debtap \
     phinger-cursors
#+end_src


** window manager
- dwl
#+begin_src shell
yay -S --noconfirm \
    libinput \
    wayland \
    wlroots # (compiled with the libinput backend, compiled with X11 support) \
    xkbcommon \
    wayland-protocols # (compile-time only) \
    pkg-config # (compile-time only) \
    libxcb # (X11 support) \
    libxcb-wm # (X11 support)
#+end_src


** prettify

*** fonts
#+begin_src shell
yay -S --noconfirm \
     adobe-source-han-sans-cn-fonts \
     adobe-source-han-serif-cn-fonts \
     ttf-symbola \
     ttf-dejavu \
     noto-fonts \
     noto-fonts-emoji \
     noto-fonts-cjk \
     ttf-dejavu-nerd \
     wqy-microhei \
     wqy-microhei-lite \
     wqy-bitmapfont \
     wqy-zenhei
#+end_src

* Development

** Haskell

*** GHCup
#+begin_src sh
yay -S ghcup-hs-bin

ghcup tui
#+end_src

* Internet
** Network connection
*** VPN
+ v2ray & v2rayA

*** proxy
+ proxychains
*** anonymous
+ Tor

** Web browsers
+ Chrome
+ Firefox
+ nyxt

** Communication
*** Email
+ gmail
+ mu4e

** remote desktop
*** Remote desktop servers
+ TigerVNC
+ NoMachine
*** Remote desktop clients
+ TigerVNC
+ Anydesk

* Multimedia
** Image
*** Image viewer
+ geeqie
+ feh
*** Image processing
+ Krita
*** font editor
+ fontforge
*** Screenshot
+ flameshot
+ snipaste

** audio
*** system
+ alsamixer
*** editor
+ Audacity

** video
*** player
+ VLC

* Utilities
** Terminal
*** Command shells
+ zsh
  - oh-my-zsh
  - starship
  - fzf-tab
  - zsh-syntax-highlighting

#+begin_src sh
# oh-my-zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
# starship
curl -sS https://starship.rs/install.sh | sh
# zsh-z
git clone https://github.com/agkozak/zsh-z ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-z
# zsh-syntax-highlight
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
# zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
# fzf-tab
git clone https://github.com/Aloxaf/fzf-tab ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/fzf-tab
#+end_src

*** Terminal Emulator
+ kitty
+ vterm

** Key visualizer
- screenkey

** Files
*** File Manager
+ nemo

*** Archive managers
+ 7zip

** development
*** Emacs
+ emacs
  #+begin_src shell
  yay -S imagemagick
  ./configure --with-pop --with-mailutils --with-native-compilation=aot --with-imagemagick --with-tree-sitter
  #+end_src


** Text Input
*** ibus
+ ibus-rime

** System
*** Task managers
+ btop

*** System log viewers
+ journalctl

*** Font Viewer
+ NA

*** Fonts
+ awesome font
+ SauceCodePro Nerd Font Mono

** bluetooth
- bluez
- bluez-utils
- blueman

* Documents and texts
** Office
+ freeoffice
** Readers and viewers
+ pdfstudioviewer
+ evince
+ okular

* Security
** Password managers
+ gpg

* Others
** Desktop environments
*** Window Manager
+ dwm-flexipatch & dwl

*** status bar
+ dwm bar
+ somebar

*** System tray
- dwm systray

*** Wallpaper
+ feh

*** Notification
+ dunst

*** Logout
- tty

