# 🐳 Docker & Rancher Desktop Installation Guide

This guide will walk you through setting up either **Docker Desktop** or **Rancher Desktop**.

* **Docker Desktop**: The OG and a super polished tool for running containers and a local Kubernetes cluster. It's been the go-to for many developers for years.
* **Rancher Desktop**: A fantastic open-source alternative from the folks at SUSE. It gives you more flexibility, like choosing your container runtime and Kubernetes version.

**Super Important Note!** 🚨 You can have both installed, but you can **only run one at a time**. They both want to control the same container management resources on your machine and will conflict if run simultaneously. Just make sure to quit one completely from your system tray or menu bar before starting the other.

---

## Prerequisites

Before we dive in, let's make sure your machine is ready.

### For Windows 🪟

* **OS**: Windows 10 (Build 19044+) or Windows 11 (64-bit).
* **WSL 2**: You need the Windows Subsystem for Linux version 2. The installers for both apps are pretty smart and will usually prompt you to install/enable it if you haven't already.
* **Hardware Virtualization**: Make sure this is enabled in your computer's BIOS/UEFI. Most modern computers have it on by default.

**Note:** Any issues please reach out to the tech leads in the team.

### For macOS 🍎

* **OS**: macOS 11 (Big Sur) or newer.
* **Chip**: Works on both Intel and Apple Silicon (M1/M2/M3) Macs.

---

## Installation Steps

Pick your tool of choice and follow the steps for your OS.

### Docker Desktop Installation

1.  **Download**: Head over to the official Docker website and grab the installer.
    * [Download Docker Desktop](https://www.docker.com/products/docker-desktop/)

2.  **Install**:
    * **On Windows**: Double-click the `.exe` file you downloaded. Follow the on-screen prompts. It will likely ask for administrative privileges and might need to configure WSL 2 for you. A restart is usually required after installation.
    * **On macOS**: Double-click the `.dmg` file. Drag the Docker whale icon into your `Applications` folder. That's it!

3.  **First Run**: Launch Docker Desktop. It might take a few minutes to start up the first time as it configures its virtual machine. Accept the terms of service, and you're good to go!

### Rancher Desktop Installation

1.  **Download**: Go to the official Rancher Desktop website to download the latest version.
    * [Download Rancher Desktop](https://rancherdesktop.io/)

2.  **Install**:
    * **On Windows**: Run the `.exe` installer. It’s a straightforward setup wizard. Grant it admin rights when it asks.
    * **On macOS**: Open the `.dmg` file and drag the Rancher Desktop icon to your `Applications` folder.

3.  **First Run**: When you first launch Rancher Desktop, it'll ask you to make a couple of key decisions. This is where its flexibility shines! You can change these later in the settings.

---

## Configuration & Verification (For Experienced Users)

Once installed, let's do a quick configuration check and verify everything is working.

### Configuring Docker Desktop

Docker Desktop is pretty much ready to go out of the box.

1.  **Resource Allocation**: Click the **gear icon** ⚙️ in the top right to open settings. Go to the **Resources** tab. Here, you can adjust how much CPU, Memory, and Disk space Docker can use. The defaults are usually fine to start with.
2.  **Enable Kubernetes**: If you want to use Kubernetes, go to the **Kubernetes** tab in settings and check the **"Enable Kubernetes"** box. Click "Apply & Restart". It will take a few minutes to download the necessary container images.
3.  **Verify Installation**: Open your terminal (PowerShell/CMD on Windows, Terminal on Mac) and run these commands:

    ```bash
    # Check that the Docker CLI is working
    docker --version

    # Run a simple container to make sure the engine is running
    docker run hello-world

    # If you enabled Kubernetes, check its status
    kubectl version --short
    ```

    If you see version numbers and the `hello-world` container runs successfully, you're all set! 🎉

### Configuring Rancher Desktop

Rancher Desktop gives you a bit more control from the get-go.

1.  **Initial Setup**: On the very first run, you'll see a setup dialog.
    * **Container Runtime**: You can choose between `containerd` and `dockerd (Moby)`. **If you want to use the familiar `docker` command, choose `dockerd (Moby)`**. This is recommended for most users coming from Docker Desktop. `containerd` is also great and uses a different CLI called `nerdctl`.
    * **Kubernetes Version**: You can pick which version of Kubernetes you want to run. It's fine to stick with the recommended stable version.

2.  **Resource Allocation**: Click the **gear icon** ⚙️ in the top left to open preferences. You can adjust CPU and Memory allocation under the **Virtual Machine** tab.
3.  **Verify Installation**: Open your terminal and run the checks.

    ```bash
    # If you chose dockerd, this should work just like Docker Desktop
    docker --version
    docker run hello-world

    # Check the Kubernetes version you selected
    kubectl version --short
    ```

    If you chose `containerd` as the runtime, you would use `nerdctl` instead of `docker`:
    ```bash
    # For containerd runtime users
    nerdctl --version
    nerdctl run hello-world
    ```
    Success! You're ready to start building and running containers. Happy coding! 🚀

You can now start running the mongoDB database, see [MongoDB ](./mongodb.md)   


[⬅️ Back](README.md)