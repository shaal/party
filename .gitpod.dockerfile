FROM gitpod/workspace-mysql

# Install Packages
RUN brew install node
RUN brew install redis
RUN npx playwright install-deps
RUN npx playwright install
