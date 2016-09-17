# Facebook Page Manager


##Login
Facebook page manager utilizes the facebook login component to authenticate users. There is no need for a user table as facebook takes care of all the storage and authentication.  Users of the page manager need to grant the following permissions to the application:



curl -i -X POST -H 'Content-Type: application/json' -d '{"object":"page","entry":[{"id":43674671559,"time":1460620433256,"messaging":[{"sender":{"id":123456789},"recipient":{"id":987654321},"timestamp":1460620433123,"message":{"mid":"mid.1460620432888:f8e3412003d2d1cd93","seq":12604,"text":"Testing Chat Bot .."}}]}]}' https://app-demo-fb.herokuapp.com/facebook


curl -H 'Content-Type: application/json' -d '{"data":"{\"message\":\"hello world\"}","name":"account_update","channel":"account_update"}' \
"https://app-demo-fb.herokuapp.com/facebook?"\
"body_md5=8a3501faef6636ca9a5ebbe6f31b5409&"\
"auth_version=1.0&"\
"auth_key=f0ed6004e66da55f7fbf&"\
"auth_timestamp=1474143000&"\
"auth_signature=df63b6c76350bd13470f6774bbee9b93421dc53bd447d705ae4bb46692c6c23f&"
