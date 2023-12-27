# ToolChain


* arch packages
** yay
#+begin_src shell
sudo pacman -Sy --needed git base-devel && git clone https://aur.archlinux.org/yay.git && cd yay && makepkg -si
#+end_src

** development
#+begin_src shell
sudo pacman -S --noconfirm \
     base-devel \
     linux-headers \
     networkmanager \
     xorg \
     xorg-xinit \
     wezterm \
     wget \
     bear \
     bc \
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
     opam # ocaml package manageer


pip install epc  \
            six  \
            pyright  \
            ipython  \
            matplotlib  \
            networkx  \
            pygments
#+end_src

** desktop environment
*** window manager
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

*** terminal
- kitty
#+begin_src shell
yay -S --noconfirm \
    kitty
#+end_src

*** launcher
- rofi
#+begin_src shell
yay -S --noconfirm \
    rofi-lbonn-wayland-git
#+end_src


** prettify

*** fonts
#+begin_src shell
yay -S --noconfirm \
    nerd-fonts-git \
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
     wqy-zenhei \
#+end_src

** personal pakcages
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
     neofetch \
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
     netease-cloud-music \
     picom \
     mu-git \
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
+ +fish+ (bash incompatible)
+ zsh
  - oh-my-zsh
  - starship
  - fzf-tab
  - zsh-syntax-highlighting

*** Terminal Emulator
+ +alacritty+
+ kitty
+ vterm

** Files
*** File Manager
+ +SpaceFM+ (severe problem: NO TRASH FOLDER)
+ nemo
*** Archive managers
+ 7zip

** development
*** Emacs
+ emacs

** Text Input
*** ibus
+ ibus-rime

** System
*** Task managers
+ btop
+ htop
*** System log viewers
+ journalctl
*** Font Viewer
+ NA
*** Fonts
+ awesome font
+ SauceCodePro Nerd Font Mono

* Documents and texts
** Office
+ freeoffice
** Readers and viewers
+ pdfstudioviewer
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
*** Wallpaper
+ feh
*** Notification
+ dunst
*** Logout
- tty
