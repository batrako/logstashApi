default: install
clean: purge

RELEASE := helm-logstash

install:
	helm upgrade --wait --timeout=600 --install  $(RELEASE) charts/logstash-1.0.0.tgz ; \
	
purge:
	helm del --purge $(RELEASE)-tiny
