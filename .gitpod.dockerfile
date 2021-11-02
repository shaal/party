FROM gitpod/workspace-mysql

# Install Packages
RUN brew install node
RUN brew install redis
RUN curl -fsSL https://bun.sh/install | bash

ENV BUN_INSTALL="/home/gitpod/.bun"
ENV PATH="$BUN_INSTALL/bin:$PATH"
