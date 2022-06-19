while true; do
    read -p "This script will erase your .env file, continue? " yn
    case $yn in
        [Yy]* ) make install; break;;
        [Nn]* ) exit;;
        * ) echo "Please answer yes or no.";;
    esac
done

cp .env.example .env
docker-compose up -d
yarn
yarn prisma migrate dev
yarn test