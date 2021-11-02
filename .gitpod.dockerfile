FROM gitpod/workspace-mysql

# Install Packages
RUN brew install node
RUN brew install redis
RUN curl -fsSL https://bun.sh/install | bash
RUN echo "BUN_INSTALL=\"/home/gitpod/.bun\"" >> $HOME/.bashrc
RUN echo "PATH=\"$BUN_INSTALL/bin:$PATH\"" >> $HOME/.bashrc