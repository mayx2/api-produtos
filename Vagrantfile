Vagrant.configure("2") do |config|

  config.vm.box = "ubuntu/jammy64"

  # VM1 - Nó de controle Ansible
  config.vm.define :vm1 do |vm1|
    vm1.vm.hostname = "vm1"
    vm1.vm.network :private_network, ip: "192.168.33.10"
    vm1.vm.synced_folder ".", "/home/vagrant/vagrant_data"

    vm1.vm.provider "virtualbox" do |vb|
      vb.memory = "1024"
    end

    vm1.vm.provision "shell", inline: <<-SHELL
      apt-get update -qq
      apt-get install -y software-properties-common
      add-apt-repository --yes --update ppa:ansible/ansible
      apt-get install -y ansible sshpass git curl

      sudo -u vagrant bash -c '
        mkdir -p /home/vagrant/.ssh
        chmod 700 /home/vagrant/.ssh
        if [ ! -f /home/vagrant/.ssh/id_rsa ]; then
          ssh-keygen -t rsa -b 4096 -N "" -f /home/vagrant/.ssh/id_rsa
        fi
      '

      cp /home/vagrant/.ssh/id_rsa.pub /home/vagrant/vagrant_data/vm1_id_rsa.pub
    SHELL
  end

  # VM2 - Servidor da aplicação
  config.vm.define :vm2 do |vm2|
    vm2.vm.hostname = "vm2"
    vm2.vm.network :private_network, ip: "192.168.33.11"
    vm2.vm.synced_folder ".", "/home/vagrant/vagrant_data"

    vm2.vm.provider "virtualbox" do |vb|
      vb.memory = "2048"
    end

    vm2.vm.provision "shell", inline: <<-SHELL
      apt-get update -qq
      apt-get install -y openssh-server git

      systemctl enable ssh
      systemctl start ssh

      echo "Aguardando chave pública da vm1..."
      for i in $(seq 1 30); do
        [ -f /home/vagrant/vagrant_data/vm1_id_rsa.pub ] && break
        sleep 2
      done

      if [ -f /home/vagrant/vagrant_data/vm1_id_rsa.pub ]; then
        sudo -u vagrant bash -c '
          mkdir -p /home/vagrant/.ssh
          chmod 700 /home/vagrant/.ssh
          cat /home/vagrant/vagrant_data/vm1_id_rsa.pub >> /home/vagrant/.ssh/authorized_keys
          chmod 600 /home/vagrant/.ssh/authorized_keys
          sort -u /home/vagrant/.ssh/authorized_keys -o /home/vagrant/.ssh/authorized_keys
        '
        echo "Chave SSH da vm1 instalada com sucesso!"
      else
        echo "ERRO: Chave pública da vm1 não encontrada!"
        exit 1
      fi
    SHELL
  end

end