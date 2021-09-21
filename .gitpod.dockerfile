FROM gitpod/workspace-mysql

# Install Packages
RUN brew install node@latest
RUN brew install redis@latest
