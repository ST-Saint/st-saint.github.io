var suggestions = document.getElementById('suggestions');
var search = document.getElementById('search');

if (search !== null) {
  document.addEventListener('keydown', inputFocus);
}

function inputFocus(e) {
  if (e.ctrlKey && e.key === '/' ) {
    e.preventDefault();
    search.focus();
  }
  if (e.key === 'Escape' ) {
    search.blur();
    suggestions.classList.add('d-none');
  }
}

document.addEventListener('click', function(event) {

  var isClickInsideElement = suggestions.contains(event.target);

  if (!isClickInsideElement) {
    suggestions.classList.add('d-none');
  }

});

/*
Source:
  - https://dev.to/shubhamprakash/trap-focus-using-javascript-6a3
*/

document.addEventListener('keydown',suggestionFocus);

function suggestionFocus(e) {
  const suggestionsHidden = suggestions.classList.contains('d-none');
  if (suggestionsHidden) return;

  const focusableSuggestions= [...suggestions.querySelectorAll('a')];
  if (focusableSuggestions.length === 0) return;

  const index = focusableSuggestions.indexOf(document.activeElement);

  if (e.key === "ArrowUp") {
    e.preventDefault();
    const nextIndex = index > 0 ? index - 1 : 0;
    focusableSuggestions[nextIndex].focus();
  }
  else if (e.key === "ArrowDown") {
    e.preventDefault();
    const nextIndex= index + 1 < focusableSuggestions.length ? index + 1 : index;
    focusableSuggestions[nextIndex].focus();
  }

}

/*
Source:
  - https://github.com/nextapps-de/flexsearch#index-documents-field-search
  - https://raw.githack.com/nextapps-de/flexsearch/master/demo/autocomplete.html
*/

(function(){

  var index = new FlexSearch.Document({
    tokenize: "forward",
    cache: 100,
    document: {
      id: 'id',
      store: [
        "href", "title", "description"
      ],
      index: ["title", "description", "content"]
    }
  });


  // Not yet supported: https://github.com/nextapps-de/flexsearch#complex-documents

  /*
  var docs = [
    {
        id: 0,
        href: "https://st-saint.github.io/docs/prologue/introduction/",
        title: "Introduction",
        description: "Doks is a Hugo theme for building secure, fast, and SEO-ready documentation websites, which you can easily update and customize.",
        content: "\u003ch2 id=\"get-started\"\u003eGet started \u003ca href=\"#get-started\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h2\u003e\n\u003cp\u003eThere are two main ways to get started with Doks:\u003c/p\u003e\n\u003ch3 id=\"tutorial\"\u003eTutorial \u003ca href=\"#tutorial\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h3\u003e\n\u003cdiv class=\"alert alert-warning d-flex\" role=\"alert\"\u003e\n  \u003cdiv class=\"flex-shrink-1 alert-icon\"\u003e👉 \u003c/div\u003e\n  \n    \u003cdiv class=\"w-100\"\u003eThe Tutorial is intended for novice to intermediate users. \u003c/div\u003e\n  \n\u003c/div\u003e\n\n\u003cp\u003eStep-by-step instructions on how to start a new Doks project. \u003ca href=\"https://getdoks.org/tutorial/introduction/\"\u003eTutorial →\u003c/a\u003e\u003c/p\u003e\n\u003ch3 id=\"quick-start\"\u003eQuick Start \u003ca href=\"#quick-start\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h3\u003e\n\u003cdiv class=\"alert alert-warning d-flex\" role=\"alert\"\u003e\n  \u003cdiv class=\"flex-shrink-1 alert-icon\"\u003e👉 \u003c/div\u003e\n  \n    \u003cdiv class=\"w-100\"\u003eThe Quick Start is intended for intermediate to advanced users. \u003c/div\u003e\n  \n\u003c/div\u003e\n\n\u003cp\u003eOne page summary of how to start a new Doks project. \u003ca href=\"/docs/prologue/quick-start/\"\u003eQuick Start →\u003c/a\u003e\u003c/p\u003e\n\u003ch2 id=\"go-further\"\u003eGo further \u003ca href=\"#go-further\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h2\u003e\n\u003cp\u003eRecipes, Reference Guides, Extensions, and Showcase.\u003c/p\u003e\n\u003ch3 id=\"recipes\"\u003eRecipes \u003ca href=\"#recipes\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h3\u003e\n\u003cp\u003eGet instructions on how to accomplish common tasks with Doks. \u003ca href=\"https://getdoks.org/docs/recipes/project-configuration/\"\u003eRecipes →\u003c/a\u003e\u003c/p\u003e\n\u003ch3 id=\"reference-guides\"\u003eReference Guides \u003ca href=\"#reference-guides\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h3\u003e\n\u003cp\u003eLearn how to customize Doks to fully make it your own. \u003ca href=\"https://getdoks.org/docs/reference-guides/security/\"\u003eReference Guides →\u003c/a\u003e\u003c/p\u003e\n\u003ch3 id=\"extensions\"\u003eExtensions \u003ca href=\"#extensions\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h3\u003e\n\u003cp\u003eGet instructions on how to add even more to Doks. \u003ca href=\"https://getdoks.org/docs/extensions/breadcrumb-navigation/\"\u003eExtensions →\u003c/a\u003e\u003c/p\u003e\n\u003ch3 id=\"showcase\"\u003eShowcase \u003ca href=\"#showcase\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h3\u003e\n\u003cp\u003eSee what others have build with Doks. \u003ca href=\"https://getdoks.org/showcase/electric-blocks/\"\u003eShowcase →\u003c/a\u003e\u003c/p\u003e\n\u003ch2 id=\"contributing\"\u003eContributing \u003ca href=\"#contributing\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h2\u003e\n\u003cp\u003eFind out how to contribute to Doks. \u003ca href=\"https://getdoks.org/docs/contributing/how-to-contribute/\"\u003eContributing →\u003c/a\u003e\u003c/p\u003e\n\u003ch2 id=\"help\"\u003eHelp \u003ca href=\"#help\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h2\u003e\n\u003cp\u003eGet help on Doks. \u003ca href=\"/docs/help/how-to-update/\"\u003eHelp →\u003c/a\u003e\u003c/p\u003e\n"
      },
    {
        id: 1,
        href: "https://st-saint.github.io/docs/prologue/quick-start/",
        title: "Quick Start",
        description: "One page summary of how to start a new Doks project.",
        content: "\u003ch2 id=\"requirements\"\u003eRequirements \u003ca href=\"#requirements\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h2\u003e\n\u003cp\u003eDoks uses npm to centralize dependency management, making it \u003ca href=\"/docs/help/how-to-update/\"\u003eeasy to update\u003c/a\u003e resources, build tooling, plugins, and build scripts:\u003c/p\u003e\n\u003cul\u003e\n\u003cli\u003eDownload and install \u003ca href=\"https://nodejs.org/\"\u003eNode.js\u003c/a\u003e (it includes npm) for your platform.\u003c/li\u003e\n\u003c/ul\u003e\n\u003ch2 id=\"start-a-new-doks-project\"\u003eStart a new Doks project \u003ca href=\"#start-a-new-doks-project\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h2\u003e\n\u003cp\u003eCreate a new site, change directories, install dependencies, and start development server.\u003c/p\u003e\n\u003ch3 id=\"create-a-new-site\"\u003eCreate a new site \u003ca href=\"#create-a-new-site\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h3\u003e\n\u003cp\u003eDoks is available as a child theme, and a starter theme:\u003c/p\u003e\n\u003cul\u003e\n\u003cli\u003eUse the Doks child theme, if you do \u003cstrong\u003enot\u003c/strong\u003e plan to customize a lot, and/or need future Doks updates.\u003c/li\u003e\n\u003cli\u003eUse the Doks starter theme, if you plan to customize a lot, and/or do \u003cstrong\u003enot\u003c/strong\u003e need future Doks updates.\u003c/li\u003e\n\u003c/ul\u003e\n\u003cp\u003eNot quite sure? Use the Doks child theme.\u003c/p\u003e\n\u003ch4 id=\"doks-child-theme\"\u003eDoks child theme \u003ca href=\"#doks-child-theme\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h4\u003e\n\u003cpre\u003e\u003ccode class=\"language-bash\"\u003egit clone https://github.com/h-enk/doks-child-theme.git my-doks-site\n\u003c/code\u003e\u003c/pre\u003e\n\u003ch4 id=\"doks-starter-theme\"\u003eDoks starter theme \u003ca href=\"#doks-starter-theme\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h4\u003e\n\u003cpre\u003e\u003ccode class=\"language-bash\"\u003egit clone https://github.com/h-enk/doks.git my-doks-site\n\u003c/code\u003e\u003c/pre\u003e\n\u003ch3 id=\"change-directories\"\u003eChange directories \u003ca href=\"#change-directories\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h3\u003e\n\u003cpre\u003e\u003ccode class=\"language-bash\"\u003ecd my-doks-site\n\u003c/code\u003e\u003c/pre\u003e\n\u003ch3 id=\"install-dependencies\"\u003eInstall dependencies \u003ca href=\"#install-dependencies\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h3\u003e\n\u003cpre\u003e\u003ccode class=\"language-bash\"\u003enpm install\n\u003c/code\u003e\u003c/pre\u003e\n\u003ch3 id=\"start-development-server\"\u003eStart development server \u003ca href=\"#start-development-server\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h3\u003e\n\u003cpre\u003e\u003ccode class=\"language-bash\"\u003enpm run start\n\u003c/code\u003e\u003c/pre\u003e\n\u003cp\u003eDoks will start the Hugo development webserver accessible by default at \u003ccode\u003ehttp://localhost:1313\u003c/code\u003e. Saved changes will live reload in the browser.\u003c/p\u003e\n\u003ch2 id=\"other-commands\"\u003eOther commands \u003ca href=\"#other-commands\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h2\u003e\n\u003cp\u003eDoks comes with commands for common tasks. \u003ca href=\"/docs/prologue/commands/\"\u003eCommands →\u003c/a\u003e\u003c/p\u003e\n"
      },
    {
        id: 2,
        href: "https://st-saint.github.io/docs/prologue/commands/",
        title: "Commands",
        description: "Doks comes with commands for common tasks.",
        content: "\u003cdiv class=\"alert alert-warning d-flex\" role=\"alert\"\u003e\n  \u003cdiv class=\"flex-shrink-1 alert-icon\"\u003e💡 \u003c/div\u003e\n  \n    \u003cdiv class=\"w-100\"\u003eYou can change the commands in the scripts section of `./package.json`. \u003c/div\u003e\n  \n\u003c/div\u003e\n\n\u003ch2 id=\"create\"\u003ecreate \u003ca href=\"#create\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h2\u003e\n\u003cp\u003eCreate new content for your site:\u003c/p\u003e\n\u003cpre\u003e\u003ccode class=\"language-bash\"\u003enpm run create [path] [flags]\n\u003c/code\u003e\u003c/pre\u003e\n\u003cp\u003eSee also the Hugo docs: \u003ca href=\"https://gohugo.io/commands/hugo_new/\"\u003ehugo new\u003c/a\u003e.\u003c/p\u003e\n\u003ch2 id=\"lint\"\u003elint \u003ca href=\"#lint\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h2\u003e\n\u003cp\u003eCheck scripts, styles, and markdown for errors:\u003c/p\u003e\n\u003cpre\u003e\u003ccode class=\"language-bash\"\u003enpm run lint\n\u003c/code\u003e\u003c/pre\u003e\n\u003ch3 id=\"scripts\"\u003escripts \u003ca href=\"#scripts\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h3\u003e\n\u003cp\u003eCheck scripts for errors:\u003c/p\u003e\n\u003cpre\u003e\u003ccode class=\"language-bash\"\u003enpm run lint:scripts [-- --fix]\n\u003c/code\u003e\u003c/pre\u003e\n\u003ch3 id=\"styles\"\u003estyles \u003ca href=\"#styles\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h3\u003e\n\u003cp\u003eCheck styles for errors:\u003c/p\u003e\n\u003cpre\u003e\u003ccode class=\"language-bash\"\u003enpm run lint:styles [-- --fix]\n\u003c/code\u003e\u003c/pre\u003e\n\u003ch3 id=\"markdown\"\u003emarkdown \u003ca href=\"#markdown\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h3\u003e\n\u003cp\u003eCheck markdown for errors:\u003c/p\u003e\n\u003cpre\u003e\u003ccode class=\"language-bash\"\u003enpm run lint:markdown [-- --fix]\n\u003c/code\u003e\u003c/pre\u003e\n\u003ch2 id=\"clean\"\u003eclean \u003ca href=\"#clean\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h2\u003e\n\u003cp\u003eDelete temporary directories:\u003c/p\u003e\n\u003cpre\u003e\u003ccode class=\"language-bash\"\u003enpm run clean\n\u003c/code\u003e\u003c/pre\u003e\n\u003ch2 id=\"start\"\u003estart \u003ca href=\"#start\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h2\u003e\n\u003cp\u003eStart local development server:\u003c/p\u003e\n\u003cpre\u003e\u003ccode class=\"language-bash\"\u003enpm run start\n\u003c/code\u003e\u003c/pre\u003e\n\u003ch2 id=\"build\"\u003ebuild \u003ca href=\"#build\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h2\u003e\n\u003cp\u003eBuild production website:\u003c/p\u003e\n\u003cpre\u003e\u003ccode class=\"language-bash\"\u003enpm run build\n\u003c/code\u003e\u003c/pre\u003e\n\u003ch3 id=\"functions\"\u003efunctions \u003ca href=\"#functions\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h3\u003e\n\u003cp\u003eBuild Lambda functions:\u003c/p\u003e\n\u003cpre\u003e\u003ccode class=\"language-bash\"\u003enpm run build:functions\n\u003c/code\u003e\u003c/pre\u003e\n\u003ch3 id=\"preview\"\u003epreview \u003ca href=\"#preview\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h3\u003e\n\u003cp\u003eBuild production website including draft and future content:\u003c/p\u003e\n\u003cpre\u003e\u003ccode class=\"language-bash\"\u003enpm run build:preview\n\u003c/code\u003e\u003c/pre\u003e\n"
      },
    {
        id: 3,
        href: "https://st-saint.github.io/docs/help/how-to-update/",
        title: "How to Update",
        description: "Regularly update the installed npm packages to keep your Doks website stable, usable, and secure.",
        content: "\u003cdiv class=\"alert alert-warning d-flex\" role=\"alert\"\u003e\n  \u003cdiv class=\"flex-shrink-1 alert-icon\"\u003e💡 \u003c/div\u003e\n  \n    \u003cdiv class=\"w-100\"\u003eLearn more about \u003ca href=\"https://docs.npmjs.com/about-semantic-versioning\"\u003esemantic versioning\u003c/a\u003e and \u003ca href=\"https://docs.npmjs.com/cli/v6/using-npm/semver#advanced-range-syntax\"\u003eadvanced range syntax\u003c/a\u003e. \u003c/div\u003e\n  \n\u003c/div\u003e\n\n\u003ch2 id=\"check-for-outdated-packages\"\u003eCheck for outdated packages \u003ca href=\"#check-for-outdated-packages\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h2\u003e\n\u003cp\u003eThe \u003ca href=\"https://docs.npmjs.com/cli/v7/commands/npm-outdated\"\u003e\u003ccode\u003enpm outdated\u003c/code\u003e\u003c/a\u003e command will check the registry to see if any (or, specific) installed packages are currently outdated:\u003c/p\u003e\n\u003cpre\u003e\u003ccode class=\"language-bash\"\u003enpm outdated [[\u0026lt;@scope\u0026gt;/]\u0026lt;pkg\u0026gt; ...]\n\u003c/code\u003e\u003c/pre\u003e\n\u003ch2 id=\"update-packages\"\u003eUpdate packages \u003ca href=\"#update-packages\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h2\u003e\n\u003cp\u003eThe \u003ca href=\"https://docs.npmjs.com/cli/v7/commands/npm-update\"\u003e\u003ccode\u003enpm update\u003c/code\u003e\u003c/a\u003e command will update all the packages listed to the latest version (specified by the tag config), respecting semver:\u003c/p\u003e\n\u003cpre\u003e\u003ccode class=\"language-bash\"\u003enpm update [\u0026lt;pkg\u0026gt;...]\n\u003c/code\u003e\u003c/pre\u003e\n"
      },
    {
        id: 4,
        href: "https://st-saint.github.io/docs/help/troubleshooting/",
        title: "Troubleshooting",
        description: "Solutions to common problems.",
        content: "\u003ch2 id=\"problems-updating-npm-packages\"\u003eProblems updating npm packages \u003ca href=\"#problems-updating-npm-packages\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h2\u003e\n\u003cp\u003eDelete the \u003ccode\u003e./node_modules\u003c/code\u003e folder, and run again:\u003c/p\u003e\n\u003cpre\u003e\u003ccode class=\"language-bash\"\u003enpm install\n\u003c/code\u003e\u003c/pre\u003e\n\u003ch2 id=\"problems-with-cache\"\u003eProblems with cache \u003ca href=\"#problems-with-cache\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h2\u003e\n\u003cp\u003eDelete the temporary directories:\u003c/p\u003e\n\u003cpre\u003e\u003ccode class=\"language-bash\"\u003enpm run clean\n\u003c/code\u003e\u003c/pre\u003e\n"
      },
    {
        id: 5,
        href: "https://st-saint.github.io/docs/help/faq/",
        title: "FAQ",
        description: "Answers to frequently asked questions.",
        content: "\u003ch2 id=\"hyas\"\u003eHyas? \u003ca href=\"#hyas\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h2\u003e\n\u003cp\u003eDoks is a \u003ca href=\"https://gethyas.com/themes/\"\u003eHyas theme\u003c/a\u003e build by the creator of Hyas.\u003c/p\u003e\n\u003ch2 id=\"footer-notice\"\u003eFooter notice? \u003ca href=\"#footer-notice\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h2\u003e\n\u003cp\u003ePlease keep it in place.\u003c/p\u003e\n\u003ch2 id=\"keyboard-shortcuts-for-search\"\u003eKeyboard shortcuts for search? \u003ca href=\"#keyboard-shortcuts-for-search\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h2\u003e\n\u003cul\u003e\n\u003cli\u003efocus: \u003ccode\u003eCtrl + /\u003c/code\u003e\u003c/li\u003e\n\u003cli\u003eselect: \u003ccode\u003e↓\u003c/code\u003e and \u003ccode\u003e↑\u003c/code\u003e\u003c/li\u003e\n\u003cli\u003eopen: \u003ccode\u003eEnter\u003c/code\u003e\u003c/li\u003e\n\u003cli\u003eclose: \u003ccode\u003eEsc\u003c/code\u003e\u003c/li\u003e\n\u003c/ul\u003e\n\u003ch2 id=\"other-documentation\"\u003eOther documentation? \u003ca href=\"#other-documentation\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h2\u003e\n\u003cul\u003e\n\u003cli\u003e\u003ca href=\"https://docs.netlify.com/\"\u003eNetlify\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href=\"https://gohugo.io/documentation/\"\u003eHugo\u003c/a\u003e\u003c/li\u003e\n\u003c/ul\u003e\n\u003ch2 id=\"can-i-get-support\"\u003eCan I get support? \u003ca href=\"#can-i-get-support\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h2\u003e\n\u003cp\u003eCreate a topic:\u003c/p\u003e\n\u003cul\u003e\n\u003cli\u003e\u003ca href=\"https://community.netlify.com/\"\u003eNetlify Community\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href=\"https://discourse.gohugo.io/\"\u003eHugo Forums\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href=\"https://github.com/h-enk/doks/discussions\"\u003eDoks Discussions\u003c/a\u003e\u003c/li\u003e\n\u003c/ul\u003e\n\u003ch2 id=\"contact-the-creator\"\u003eContact the creator? \u003ca href=\"#contact-the-creator\" class=\"anchor\" aria-hidden=\"true\"\u003e#\u003c/a\u003e\u003c/h2\u003e\n\u003cp\u003eSend \u003ccode\u003eh-enk\u003c/code\u003e a message:\u003c/p\u003e\n\u003cul\u003e\n\u003cli\u003e\u003ca href=\"https://community.netlify.com/\"\u003eNetlify Community\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href=\"https://discourse.gohugo.io/\"\u003eHugo Forums\u003c/a\u003e\u003c/li\u003e\n\u003cli\u003e\u003ca href=\"https://github.com/h-enk/doks/discussions\"\u003eDoks Discussions\u003c/a\u003e\u003c/li\u003e\n\u003c/ul\u003e\n"
      },
    {
        id: 6,
        href: "https://st-saint.github.io/docs/help/",
        title: "Help",
        description: "Help Doks.",
        content: ""
      },
    {
        id: 7,
        href: "https://st-saint.github.io/docs/prologue/",
        title: "Prologue",
        description: "Prologue Doks.",
        content: ""
      },
    {
        id: 8,
        href: "https://st-saint.github.io/docs/",
        title: "Docs",
        description: "Docs Doks.",
        content: ""
      },
    ];
  */

  // https://discourse.gohugo.io/t/range-length-or-last-element/3803/2

  index.add(
    {
        id: 0,
        href: "/docs/prologue/introduction/",
        title: "Introduction",
        description: "Doks is a Hugo theme for building secure, fast, and SEO-ready documentation websites, which you can easily update and customize.",
        content: "Get started # There are two main ways to get started with Doks:\nTutorial # 👉  The Tutorial is intended for novice to intermediate users.   Step-by-step instructions on how to start a new Doks project. Tutorial →\nQuick Start # 👉  The Quick Start is intended for intermediate to advanced users.   One page summary of how to start a new Doks project. Quick Start →\nGo further # Recipes, Reference Guides, Extensions, and Showcase.\nRecipes # Get instructions on how to accomplish common tasks with Doks. Recipes →\nReference Guides # Learn how to customize Doks to fully make it your own. Reference Guides →\nExtensions # Get instructions on how to add even more to Doks. Extensions →\nShowcase # See what others have build with Doks. Showcase →\nContributing # Find out how to contribute to Doks. Contributing →\nHelp # Get help on Doks. Help →\n"
      })
      .add(
      {
        id: 1,
        href: "/docs/prologue/quick-start/",
        title: "Quick Start",
        description: "One page summary of how to start a new Doks project.",
        content: "Requirements # Doks uses npm to centralize dependency management, making it easy to update resources, build tooling, plugins, and build scripts:\n Download and install Node.js (it includes npm) for your platform.  Start a new Doks project # Create a new site, change directories, install dependencies, and start development server.\nCreate a new site # Doks is available as a child theme, and a starter theme:\n Use the Doks child theme, if you do not plan to customize a lot, and/or need future Doks updates. Use the Doks starter theme, if you plan to customize a lot, and/or do not need future Doks updates.  Not quite sure? Use the Doks child theme.\nDoks child theme # git clone https://github.com/h-enk/doks-child-theme.git my-doks-site  Doks starter theme # git clone https://github.com/h-enk/doks.git my-doks-site  Change directories # cd my-doks-site  Install dependencies # npm install  Start development server # npm run start  Doks will start the Hugo development webserver accessible by default at http://localhost:1313. Saved changes will live reload in the browser.\nOther commands # Doks comes with commands for common tasks. Commands →\n"
      })
      .add(
      {
        id: 2,
        href: "/docs/prologue/commands/",
        title: "Commands",
        description: "Doks comes with commands for common tasks.",
        content: "💡  You can change the commands in the scripts section of `./package.json`.   create # Create new content for your site:\nnpm run create [path] [flags]  See also the Hugo docs: hugo new.\nlint # Check scripts, styles, and markdown for errors:\nnpm run lint  scripts # Check scripts for errors:\nnpm run lint:scripts [-- --fix]  styles # Check styles for errors:\nnpm run lint:styles [-- --fix]  markdown # Check markdown for errors:\nnpm run lint:markdown [-- --fix]  clean # Delete temporary directories:\nnpm run clean  start # Start local development server:\nnpm run start  build # Build production website:\nnpm run build  functions # Build Lambda functions:\nnpm run build:functions  preview # Build production website including draft and future content:\nnpm run build:preview  "
      })
      .add(
      {
        id: 3,
        href: "/docs/help/how-to-update/",
        title: "How to Update",
        description: "Regularly update the installed npm packages to keep your Doks website stable, usable, and secure.",
        content: "💡  Learn more about semantic versioning and advanced range syntax.   Check for outdated packages # The npm outdated command will check the registry to see if any (or, specific) installed packages are currently outdated:\nnpm outdated [[\u0026lt;@scope\u0026gt;/]\u0026lt;pkg\u0026gt; ...]  Update packages # The npm update command will update all the packages listed to the latest version (specified by the tag config), respecting semver:\nnpm update [\u0026lt;pkg\u0026gt;...]  "
      })
      .add(
      {
        id: 4,
        href: "/docs/help/troubleshooting/",
        title: "Troubleshooting",
        description: "Solutions to common problems.",
        content: "Problems updating npm packages # Delete the ./node_modules folder, and run again:\nnpm install  Problems with cache # Delete the temporary directories:\nnpm run clean  "
      })
      .add(
      {
        id: 5,
        href: "/docs/help/faq/",
        title: "FAQ",
        description: "Answers to frequently asked questions.",
        content: "Hyas? # Doks is a Hyas theme build by the creator of Hyas.\nFooter notice? # Please keep it in place.\nKeyboard shortcuts for search? #  focus: Ctrl + / select: ↓ and ↑ open: Enter close: Esc  Other documentation? #  Netlify Hugo  Can I get support? # Create a topic:\n Netlify Community Hugo Forums Doks Discussions  Contact the creator? # Send h-enk a message:\n Netlify Community Hugo Forums Doks Discussions  "
      })
      .add(
      {
        id: 6,
        href: "/docs/help/",
        title: "Help",
        description: "Help Doks.",
        content: ""
      })
      .add(
      {
        id: 7,
        href: "/docs/prologue/",
        title: "Prologue",
        description: "Prologue Doks.",
        content: ""
      })
      .add(
      {
        id: 8,
        href: "/docs/",
        title: "Docs",
        description: "Docs Doks.",
        content: ""
      })
      ;

  search.addEventListener('input', show_results, true);

          var currentSection = "docs"

  function show_results(){
    const maxResult = 5;
    var searchQuery = this.value;
    var results = index.search(searchQuery, {limit: maxResult, enrich: true});

    // flatten results since index.search() returns results for each indexed field
    const flatResults = new Map(); // keyed by href to dedupe results
    for (const result of results.flatMap(r => r.result)) {
      if (flatResults.has(result.doc.href)) continue;
      flatResults.set(result.doc.href, result.doc);
    }

    suggestions.innerHTML = "";
    suggestions.classList.remove('d-none');

    // inform user that no results were found
    if (flatResults.size === 0 && searchQuery) {
      const noResultsMessage = document.createElement('div')
      noResultsMessage.innerHTML = `No results for "<strong>${searchQuery}</strong>"`
      noResultsMessage.classList.add("suggestion__no-results");
      suggestions.appendChild(noResultsMessage);
      return;
    }

    // construct a list of suggestions
    for(const [href, doc] of flatResults) {
        const entry = document.createElement('div');
        suggestions.appendChild(entry);

        const a = document.createElement('a');
        a.href = href;
        entry.appendChild(a);

        const title = document.createElement('span');
        title.textContent = doc.title;
        title.classList.add("suggestion__title");
        a.appendChild(title);

        const description = document.createElement('span');
        description.textContent = doc.description;
        description.classList.add("suggestion__description");
        a.appendChild(description);

        suggestions.appendChild(entry);

        if(suggestions.childElementCount == maxResult) break;
    }
  }
}());
