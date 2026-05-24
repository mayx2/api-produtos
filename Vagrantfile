Vagrant.configure("2") do |config|

  config.vm.box = "ubuntu/jammy64"

 
  config.vm.define :vm1 do |vm1|

    vm1.vm.hostname = "vm1"

    vm1.vm.network :private_network, :ip => "192.168.33.10"

    vm1.vm.provider "virtualbox" do |vb|
      vb.memory = "1024"
    end

  end


  config.vm.define :vm2 do |vm2|

    vm2.vm.hostname = "vm2"

    vm2.vm.network :private_network, :ip => "192.168.33.11"

    vm2.vm.synced_folder ".", "/home/vagrant/vagrant_data"

    vm2.vm.provider "virtualbox" do |vb|
      vb.memory = "2048"
    end

    
       vm2.vm.provision "shell", inline: <<-SHELL
      sudo apt update

      curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -

      sudo apt install -y nodejs

      cd /home/vagrant/vagrant_data
      npm install
    SHELL

  end

end