Vagrant.configure("2") do |config|

  config.vm.box = "ubuntu/jammy64"

  # VM1 
  config.vm.define :vm1 do |vm1|

    vm1.vm.hostname = "vm1"

    vm1.vm.network :private_network, ip: "192.168.33.10"

    vm1.vm.synced_folder ".", "/home/vagrant/vagrant_data"

    vm1.vm.provider "virtualbox" do |vb|
      vb.memory = "1024"
    end

    vm1.vm.provision "shell", inline: <<-SHELL
      sudo apt update

      sudo apt install -y software-properties-common

      sudo add-apt-repository --yes --update ppa:ansible/ansible

      sudo apt install -y ansible sshpass git curl
    SHELL

  end

  # VM2 
  config.vm.define :vm2 do |vm2|

    vm2.vm.hostname = "vm2"

    vm2.vm.network :private_network, ip: "192.168.33.11"

    vm2.vm.synced_folder ".", "/home/vagrant/vagrant_data"

    vm2.vm.provider "virtualbox" do |vb|
      vb.memory = "2048"
    end

    vm2.vm.provision "shell", inline: <<-SHELL
      sudo apt update
      sudo apt install -y openssh-server git

      
    SHELL

  end

end