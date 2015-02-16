# Howst

Tool to quickly and easily spin up local Drupal instances.  It functions essentially as a wrapper around a Vagrantfile with some convienience management methods.

## Part 1: Installing the Howst Application

1. Install the following dependencies:
    * Vagrant (https://www.vagrantup.com/)
    * NodeJS (http://nodejs.org/)
2. Install Howst from npm via the command line:
    $ npm install -g howst

## Part 2: Getting your local site up and running in Howst

Option A: Exisiting Site

1. Clone the code onto your local machine (for example, in /Users/<username>/Sites/<mysite>.local)
2. Create a folder in $HOME/.drush that contains the drush alias for the remote site from which you are cloning. Inlcude any other drush files you like (policy files, etc.)
2. Create a new Howst machine with `howst create <hostname>`.  Be sure to give it a meaningful and unique hostname.
3. The wizard will walk you though the remainder of the setup.  Here are the options, default values (which are in [brackets]), descriptions, and what you should type:
   * Is Existing Site [false] - Indicates whether site is already created and hosted somewhere (Pantheon, Acquia Cloud, AWS, etc.) or if it's a brand spanking new install. This is an existing site, so type `true`  
   * Is this a Pantheon Site [false] - Tells Howst to configure an environment specific to Pantheon. If the site you are cloning is a Pantheon site, type `true`
   * Host Docroot [undefined] - Path to Drupal Docroot on your local machine. You should type the full system path to your local Drupal site. For example `/Users/<username>/Sites/<mysite>.local`
   * Drush Version [6] - Which version of Drush to use.  (Note that Drush 7 is required for Drupal 8 and Pantheon requires Drush 5). If to use Drush 5 type `5`; if you want to use Drush 6, just click the enter key; if you want Drush 7, type `7`.
   * Path to Drush Files [$HOME/.drush/<hostname>] - Path to the drush files on your local machine.
   * Drush Alias [<hostname>] - Drush alias of the existing site your are recreating (don't include the preceeding `@`)
   * Port [8080] - Which port on you local machine will used to access the drupal instance. You need to have a different port for each site. You can start with 8080 but then you should use 8081, 8082, 8083, etc.
4. Now, you need to pull the db.  SSH into your new Howst machine by using: `howst ssh <hostname>`.  Then, run the script generated by Howst to install the db. This can be run from anywhere by using the `pull-db` command.
5. Type `howst up <hostname>`. The first time you do this, it will take some time.
6. You are done! Visit `http://localhost:<port>` to see your newly-cloned site.
7. If you want to specify a URL to your local site, simply edit your /etc/hosts file.

Option B: New Site

1. Create a new Howst machine with `howst create <hostname>`.  Be sure to give it a meaningful and unique hostname.
2. The wizard will walk you though the remainder of the setup.  The available options, defaults, and descriptions are listed below:
   * Is Existing Site [false] - Indicates whether site is already created and hosted somewhere (Pantheon, Acquia Cloud, AWS, etc.) or if it's a brand spanking new install. This is a new site, so just click the the enter key.  
   * Drupal Version [7] - Which version of Drupal to install. If you want D7, just click the enter key. If you want D8, type `8`.
   * Host Docroot [undefined] - Path to Drupal Docroot on your local machine. You should type the full system path to your local Drupal site. For example `/Users/<username>/Sites/<mysite>.local`
   * Drush Version [6] - Which version of Drush to use.  (Note that Drush 7 is required for Drupal 8 and Pantheon requires Drush 5). If to use Drush 5 type `5`; if you want to use Drush 6, just click the enter key; if you want Drush 7, type `7`.
   * Path to Drush Files [$HOME/.drush/<hostname>] - Path to the drush files on your local machine
   * Port [8080] - Which port on you local machine will used to access the drupal instance. You need to have a different port for each site. You can start with 8080 but then you should use 8081, 8082, 8083, etc.
3. Type `howst up <hostname>`. The first time you do this, it will take some time.
4. You are done!  Visit `http://localhost:<port>` to access your new site

##Usage

```
Usage: howst [options] [command]


  Commands:

    create <hostname>           Create a new Howst machine
    config <hostname>           Reconfigure an existing Howst machine
    remove <hostname>           stops and deletes all traces of the Howst machine
    list [options]              Lists all known Howst machines
    remote-password <password>  Sets password for syncing remote databases
    *                           Vagrant passthrough.  See below.

  Options:

    -h, --help     output usage information
    -V, --version  output the version number

  Vagrant passthrough commands: 
        box             manages boxes: installation, removal, etc. 
        connect         connect to a remotely shared Vagrant environment 
        default         sets the defaults howst instance 
        global-status   outputs status Vagrant environments for this user 
        halt            stops the vagrant machine 
        help            shows the help for a subcommand 
        init            initializes a new Vagrant environment by creating a Vagrantfile 
        login           log in to HashiCorp's Atlas 
        package         packages a running vagrant environment into a box 
        plugin          manages plugins: install, uninstall, update, etc. 
        provision       provisions the vagrant machine 
        push            deploys code in this environment to a configured destination 
        rdp             connects to machine via RDP 
        reload          restarts vagrant machine, loads new Vagrantfile configuration 
        resume          resume a suspended vagrant machine 
        share           share your Vagrant environment with anyone in the world 
        ssh             connects to machine via SSH 
        ssh-config      outputs OpenSSH valid configuration to connect to the machine 
        status          outputs status of the vagrant machine 
        suspend         suspends the machine 
        up              starts and provisions the vagrant environment
        version         prints current and latest Vagrant version

```

## Trobleshooting
  * If your site throws an error when you first visit it, check the settings.php file. If there isn't one present in the `sites/default` folder Howst should automatically generate one (and it might need some tweaking).
  * TODO

## Optional Developer Install Instructions (don't do this unless you want to work on the appl itself)

    $ git clone https://github.com/bowst/howst-app.git
    $ cd howst-app
    $ npm link

This will link the package to your bin so you can edit code in your local git repo and test on the commandline from anywhere! Just keep in mind that if you make changes to the `vagrant` folder, you'll need to run `npm link` again to copy the appropriate files to the $HOME/.howst directory.

## Contributing

1. Fork it ( https://github.com/bowst/howst-app/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request