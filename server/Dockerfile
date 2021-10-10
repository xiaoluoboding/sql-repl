FROM jdos_base/jd-centos7.2-nodejs8.2.1-ngx

ADD . /app

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD = 1

RUN yum install pango.x86_64 libXcomposite.x86_64 libXcursor.x86_64 libXdamage.x86_64 libXext.x86_64 libXi.x86_64 libXtst.x86_64 cups-libs.x86_64 libXScrnSaver.x86_64 libXrandr.x86_64 GConf2.x86_64 alsa-lib.x86_64 atk.x86_64 gtk3.x86_64 -y \
  && yum install ipa-gothic-fonts xorg-x11-fonts-100dpi xorg-x11-fonts-75dpi xorg-x11-utils xorg-x11-fonts-cyrillic xorg-x11-fonts-Type1 xorg-x11-fonts-misc -y  \
  && yum install nss.x86_64 -y \
  && yum install -y wget.x86_64 vim-enhanced.x86_64 tree.x86_64 unzip.x86_64 net-tools.x86_64 telnet.x86_64 \
  && mkdir /app/chromium && cd /app/chromium && wget -O 'chrome-linux.zip' 'http://storage.jd.local/easybi/chromium/chrome-linux.zip' \
  && unzip chrome-linux.zip && \rm chrome-linux.zip \
  && npm config set unsafe-perm=true \
  && mkdir /usr/share/fonts/chinese \
  && cd /app && wget -O 'puppeteer-fonts.zip' 'http://storage.jd.local/easybi/chromium/fonts.zip' \
  && unzip puppeteer-fonts.zip && \rm puppeteer-fonts.zip \
  && tree /app -L 3 -I node_modules \
  && cp /app/fonts/*.ttf /usr/share/fonts/chinese \
  && cd /usr/share/fonts/chinese \
  && yum install mkfontscale \
  && yum install fontconfig \
  && mkfontscale \
  && mkfontdir \
  && cd /app \
  && npm set registry http://registry.m.jd.com \
  && npm install \
  && npm run build \
  && chmod +x /app/bin/*.sh

ENTRYPOINT /usr/sbin/sshd \
  && /usr/sbin/crond \
  && chown -R admin:admin /app /export \
  && cp /app/bin/start-server.sh /home/admin/start.sh \
  && cp /app/bin/stop-server.sh /home/admin/stop.sh \
  && chown -R admin:admin /home/admin/* \
  && su admin -c /home/admin/start.sh \
  && sleep 999999d
