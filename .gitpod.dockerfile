FROM gitpod/workspace-mysql

# Install Node and Yarn
ENV NODE_VERSION=16.13.0
RUN bash -c ". .nvm/nvm.sh && \
        nvm install ${NODE_VERSION} && \
        nvm alias default ${NODE_VERSION} && \
        npm install -g yarn"
ENV PATH=/home/gitpod/.nvm/versions/node/v${NODE_VERSION}/bin:$PATH

# Install Redis.
RUN sudo apt update \
        && sudo apt install -y \
        redis-server \
        && sudo rm -rf /var/lib/apt/lists/*

# Install Playwright deps
RUN npx playwright install-deps
RUN npx playwright install
