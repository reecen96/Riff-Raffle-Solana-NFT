echo "------------------\n"
export SCRIPT_PATH="/Users/nagy/Files/CryptoCoders/draffle/scripts" # FIXME CHANGE PATH
export ROOT_PATH="/Users/nagy/Files/CryptoCoders/draffle" # FIXME CHANGE PATH
echo "\nSCRIPT PATH:"
echo $SCRIPT_PATH

alias cdate=gdate
cdate
source "${SCRIPT_PATH}/../app/.env"

echo "\nREACT_APP_DRAFFLE_PROGRAM_ID FROM ENV:"
echo $REACT_APP_DRAFFLE_PROGRAM_ID

echo "------------------\n"

##############################
DRAFFLE_PROGRAM_ID="$(solana address -k ${SCRIPT_PATH}/../target/deploy/draffle-keypair.json)"
# COMMUNITY_STAKING_PROGRAM_ID="$(solana address -k ${SCRIPT_PATH}/../target/deploy/community_staking-keypair.json)"
# DISPENSER_PROGRAM_ID="$(solana address -k ${SCRIPT_PATH}/../target/deploy/dispenser-keypair.json)"

echo "\n-------------"
echo "DRAFFLE PROGRAM ID"
echo $DRAFFLE_PROGRAM_ID
# echo "COMMUNITY_STAKING_PROGRAM_ID"
# echo $COMMUNITY_STAKING_PROGRAM_ID
# echo "DISPENSER_PROGRAM_ID"
# echo $DISPENSER_PROGRAM_ID

##############################
echo "Setting cluster to localnet..."
# solana config set --url http://127.0.0.1:8899
solana config set --url https://api.devnet.solana.com
echo "Done"

##############################
echo "Getting accounts addresses..."
# This is an NFT that will be a prize. Here we just pre-specify the keypair (pubkey) that will be the address of it.
NFT1_ADDRESS="$(solana address -k ${SCRIPT_PATH}/sample_accounts/prize-nft1-keypair.json)" 
echo "${NFT1_ADDRESS}"
NFT2_ADDRESS="$(solana address -k ${SCRIPT_PATH}/sample_accounts/prize-nft2-keypair.json)"
echo "${NFT2_ADDRESS}"
NFT3_ADDRESS="$(solana address -k ${SCRIPT_PATH}/sample_accounts/prize-nft3-keypair.json)"
echo "${NFT3_ADDRESS}"
NFT4_ADDRESS="$(solana address -k ${SCRIPT_PATH}/sample_accounts/prize-nft4-keypair.json)"
echo "${NFT4_ADDRESS}"
NFT5_ADDRESS="$(solana address -k ${SCRIPT_PATH}/sample_accounts/prize-nft5-keypair.json)"
echo "${NFT5_ADDRESS}"

MINT1_ADDRESS="$(solana address -k ${SCRIPT_PATH}/sample_accounts/dev-mint-keypair.json)"
echo "${MINT1_ADDRESS}"
MINT2_ADDRESS="$(solana address -k ${SCRIPT_PATH}/sample_accounts/prize-mint1-keypair.json)"
echo "${MINT2_ADDRESS}"
MINT3_ADDRESS="$(solana address -k ${SCRIPT_PATH}/sample_accounts/prize-mint2-keypair.json)"
echo "${MINT3_ADDRESS}"

SPL_ADDRESS="$(solana address -k ${SCRIPT_PATH}/sample_accounts/spl-token-keypair.json)"
echo "${SPL_ADDRESS}" # F6RHU6tNfzwpHbnYhx5szEY3vjJDyF5D1E6N9rrMgQ7x

## NOTE TOPIC SPL TOKEN
# This is just for testing. It creates a test user account and a faucet to get the custom spl-token from later
# that you can buy tickets with. Not really required as I recommend creating your own spl-token seperately
# and using that only as you're developing. Having a single token on the side is easier than all this messing around.
##
# TEST_USER_ADDRESS="$(solana address -k ${SCRIPT_PATH}/sample_accounts/user1-keypair.json)"
# echo "${TEST_USER_ADDRESS}"
# MINT1_FAUCET_ADDRESS="$(solana address -k ${SCRIPT_PATH}/sample_accounts/user2-keypair.json)"
# echo "${MINT1_FAUCET_ADDRESS}"
# WSOL=So11111111111111111111111111111111111111112
# echo "Done"

##############################
echo "Creating sample mints, accounts, and funding them..."
spl-token create-token ${SCRIPT_PATH}/sample_accounts/prize-nft1-keypair.json --decimals 0
spl-token create-account ${NFT1_ADDRESS}
spl-token mint ${NFT1_ADDRESS} 1

spl-token create-token ${SCRIPT_PATH}/sample_accounts/prize-nft2-keypair.json --decimals 0
spl-token create-account ${NFT2_ADDRESS}
spl-token mint ${NFT2_ADDRESS} 1

spl-token create-token ${SCRIPT_PATH}/sample_accounts/dev-mint-keypair.json --decimals 6
spl-token create-account ${MINT1_ADDRESS}
spl-token mint ${MINT1_ADDRESS} 3000000

spl-token create-token ${SCRIPT_PATH}/sample_accounts/prize-mint1-keypair.json --decimals 0
spl-token create-account ${MINT2_ADDRESS}
spl-token mint ${MINT2_ADDRESS} 30000

spl-token create-token ${SCRIPT_PATH}/sample_accounts/spl-token-keypair.json --decimals 0 # this is our own, use this, deployed on devnet. See ## NOTE TOPIC SPL TOKEN
spl-token create-account ${SPL_ADDRESS}
spl-token mint ${SPL_ADDRESS} 300000

# spl-token create-token ${SCRIPT_PATH}/sample_accounts/prize-mint2-keypair.json --decimals 2
# spl-token create-account ${MINT3_ADDRESS}
# spl-token mint ${MINT3_ADDRESS} 30000

## on devnet do this manually
# solana airdrop 10000
## SEE NOTE TOPIC SPL TOKEN this is not needed while testing as we don't need automated faucet or the test user automatically set up
# solana transfer --allow-unfunded-recipient ${TEST_USER_ADDRESS} 0.1
# solana transfer --allow-unfunded-recipient ${MINT1_FAUCET_ADDRESS} 2

## airdropping spl-token-1 to a test user and to a faucet. faucet used for testing, so not really needed in this case.
## this spl-token can and will be used for buying tickets to the raffle
# spl-token transfer --allow-unfunded-recipient --fund-recipient  ${MINT1_ADDRESS} 3 ${TEST_USER_ADDRESS}
# spl-token transfer --allow-unfunded-recipient --fund-recipient  ${MINT1_ADDRESS} 3 ${MINT1_FAUCET_ADDRESS}
# echo "Done"

##############################
echo "Creating sample raffles..."
cd ${ROOT_PATH}
cargo build # This builds the CLI tool.

## This raffle address is live and deployed!! # 8rsoqPazYrmx4VdcEcPoD4oHsQ16tbfm6La2j7QoSoFw
# target/debug/draffle create-raffle ${MINT1_ADDRESS} 500000 "2022-04-04 23:35" /Users/nagy/Files/CryptoCoders/draffle/scripts/sample_accounts/raffle/entrants1-keypair.json
## Creating a raffle with the spl-token-1 as the token to use to buy the tickets and ending date. Entrant is not really needed AFAIU but can pre-add already
${SCRIPT_PATH}/../target/debug/draffle create-raffle \
    ${MINT1_ADDRESS} \
    500000 \
    "(cdate --utc -d "+5 minute" '+%Y-%m-%d %H:%M')" \
    "${SCRIPT_PATH}/sample_accounts/raffle/entrants1-keypair.json" \
    --provider.cluster devnet \
    --provider.wallet scripts/cc-draffle-deploy-keypair.json

${SCRIPT_PATH}/../target/debug/draffle create-raffle \
    ${SPL_ADDRESS} \
    1 \
    "2022-05-05 19:35" \
    --provider.cluster devnet \
    --provider.wallet scripts/cc-draffle-deploy-keypair.json

${SCRIPT_PATH}/../target/debug/draffle create-raffle \
    ${SPL_ADDRESS} \
    1 \
    "2022-04-20 13:51" \
    --provider.cluster devnet \
    --provider.wallet scripts/cc-draffle-deploy-keypair.json

## NOTES
# 1 1 - this means 1 token, in the 1 place of the prize array. arrays start at 0 yea (error 0x1772)
${SCRIPT_PATH}/../target/debug/draffle add-prize 8rsoqPazYrmx4VdcEcPoD4oHsQ16tbfm6La2j7QoSoFw ${MINT2_ADDRESS} 25 0
${SCRIPT_PATH}/../target/debug/draffle add-prize 8rsoqPazYrmx4VdcEcPoD4oHsQ16tbfm6La2j7QoSoFw ${NFT1_ADDRESS} 1 1
${SCRIPT_PATH}/../target/debug/draffle add-prize GopXKxDwCaST9FHR8RBmmqCFdUAvRLNVPvkiLjgHNaAS ${NFT2_ADDRESS} 1 1
${SCRIPT_PATH}/../target/debug/draffle add-prize 8rsoqPazYrmx4VdcEcPoD4oHsQ16tbfm6La2j7QoSoFw ${MINT3_ADDRESS} 334 2
${SCRIPT_PATH}/../target/debug/draffle add-prize 8rsoqPazYrmx4VdcEcPoD4oHsQ16tbfm6La2j7QoSoFw ${NFT4_ADDRESS} 1 3
${SCRIPT_PATH}/../target/debug/draffle add-prize 8rsoqPazYrmx4VdcEcPoD4oHsQ16tbfm6La2j7QoSoFw ${MINT3_ADDRESS} 12300 4

${SCRIPT_PATH}/../target/debug/draffle add-prize \
    9wivTLnjau6FewhxNnhnCVm783D4mj4myUrUj5qtr1Lw \
    CTxsYcUHuiwHPrwAY8mTCGKCUXkfehorzaQ66HWA6vZm \
    1 0 \
    --provider.wallet scripts/cc-draffle-deploy-keypair.json


### extra flags for CLI tool
--provider.cluster devnet \
--provider.wallet scripts/cc-draffle-deploy-keypair.json \

### Show raffle
${SCRIPT_PATH}/../target/debug/draffle show-raffle 8rsoqPazYrmx4VdcEcPoD4oHsQ16tbfm6La2j7QoSoFw

##############################
echo "Creating sample NFT metadata with URLs REACT_APP_URL=${REACT_APP_URL} and REACT_APP_RPC_ENDPOINT=${REACT_APP_RPC_ENDPOINT}"
## Adding metadata to the prize NFT with the metaplex cli tool. Since this is a test NFT and has no metadata yet, we need to add it here. In a live env this would not be needed because we use actual NFTs.
RUST_BACKTRACE=full ${SCRIPT_PATH}/metaplex-token-metadata-test-client create_metadata_accounts --name "Degen Ape #1" --symbol "DA" --uri "${REACT_APP_URL}/nfts/degenApe1.json" --url "${REACT_APP_RPC_ENDPOINT}" --mint "${SCRIPT_PATH}/sample_accounts/prize-nft1-keypair.json" --keypair scripts/cc-draffle-deploy-keypair.json
RUST_BACKTRACE=full ${SCRIPT_PATH}/metaplex-token-metadata-test-client create_metadata_accounts --name "Degen Ape #1" --symbol "DA" --uri "${REACT_APP_URL}/nfts/degenApe1.json" --url "${REACT_APP_RPC_ENDPOINT}" --mint "${SCRIPT_PATH}/sample_accounts/prize-nft2-keypair.json" --keypair scripts/cc-draffle-deploy-keypair.json



### TEST VALIDATOR
## need to add the custom programs to the test validator this way - clone from mainnet-beta
solana-test-validator \
--bpf-program raFv43GLKy2ySi5oVExZxFGwdbKRRaDQBqikiY9YbVF target/deploy/draffle.so \
--bpf-program metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s scripts/metaplex_token_metadata.so \
--clone H6ARHf6YXhGYeQfUzQNGk6rDNnLBQKrenN712K4AQJEG \
--clone GVXRSBjFk6e6J3NbVPXohDJetcTjaeeuykUpbQF8UoMU \
--clone 3NBReDRTLKMQEKiLD5tGcx4kXbTf88b7f2xLS9UuGjym \
--url mainnet-beta

solana-test-validator \
--bpf-program raFv43GLKy2ySi5oVExZxFGwdbKRRaDQBqikiY9YbVF target/deploy/draffle.so \
--bpf-program 56zQMVdReF9VTm4E2gqXPC7Z44Rqq5YsSUHVeKGhPYVv target/deploy/community_staking.so \
--bpf-program Af1FcsjwEmJQ9E1nKhsDmFMvvE8wjrLW3FRAXjzCAaMR target/deploy/dispenser.so \
--bpf-program metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s scripts/metaplex_token_metadata.so \
--clone H6ARHf6YXhGYeQfUzQNGk6rDNnLBQKrenN712K4AQJEG \
--clone GVXRSBjFk6e6J3NbVPXohDJetcTjaeeuykUpbQF8UoMU \
--clone 3NBReDRTLKMQEKiLD5tGcx4kXbTf88b7f2xLS9UuGjym \
--url devnet




spl-token 29a6AWBP44QUnfZKNpWSU7tkfrfDBym94EtCZBPvJ2ao (deployer-keypair authority)


# SOL RAFFLE 0.1 SOL ticket
target/debug/draffle create-raffle \
        29a6AWBP44QUnfZKNpWSU7tkfrfDBym94EtCZBPvJ2ao \
        100000000 \
        "2022-05-12 09:00" \
        --max-entrants 100 \
        --provider.cluster devnet \
        --provider.wallet operations/PerrXcLkieKrGRuodwhYikfnYJi9cTNiRyK5hrufjXy.json \
        --program-id raFv43GLKy2ySi5oVExZxFGwdbKRRaDQBqikiY9YbVF

# SOL RAFFE
target/debug/draffle add-prize \
        EXJPFGP7FSUVdG1zEnbcCDnjpm7QBBsS6uBSRL3wv362 \
        6UskN8KUyV6vohyvMWFx3GTmKRkgDPKWUcZhHe4sg8Uy \
        1 \
        0 \
        --provider.cluster mainnet \
        --provider.wallet operations/PerrXcLkieKrGRuodwhYikfnYJi9cTNiRyK5hrufjXy.json \
        --program-id raFv43GLKy2ySi5oVExZxFGwdbKRRaDQBqikiY9YbVF

target/debug/draffle show-raffle \
    2yL3G9UuT9sEXJkSa67mnur2cjnteVRpCZRfSeNXvED4 \
    --provider.cluster devnet

target/debug/draffle reveal-winners \
        2yL3G9UuT9sEXJkSa67mnur2cjnteVRpCZRfSeNXvED4 \
        --provider.cluster devnet \
        --provider.wallet operations/PerrXcLkieKrGRuodwhYikfnYJi9cTNiRyK5hrufjXy.json \
        --program-id raFv43GLKy2ySi5oVExZxFGwdbKRRaDQBqikiY9YbVF

target/debug/draffle collect-proceeds \
        5Po1nyZ9UAQzjS2KdV8b6Lwk3y9hwxrL1po2dvfn6dr9 \
        Czt28u7gMKPy2924adLsCiL9Hg65XqS2GDjDTQuCGNMf \
        --provider.cluster devnet \
        --provider.wallet operations/PerrXcLkieKrGRuodwhYikfnYJi9cTNiRyK5hrufjXy.json \
        --program-id raFv43GLKy2ySi5oVExZxFGwdbKRRaDQBqikiY9YbVF

target/debug/draffle close-entrants \
    --provider.cluster devnet \
    --provider.wallet operations/PerrXcLkieKrGRuodwhYikfnYJi9cTNiRyK5hrufjXy.json \
    --program-id raFv43GLKy2ySi5oVExZxFGwdbKRRaDQBqikiY9YbVF \
    5Po1nyZ9UAQzjS2KdV8b6Lwk3y9hwxrL1po2dvfn6dr9


lamports per sol 1000000000

devnet test token 6 decimals 4CHXmf6dkqL4pPY1DdmShw5yeow5DTM7mvZ9QXx4WkwD


GenesysGo devnet endpoint: https://psytrbhymqlkfrhudd.dev.genesysgo.net:8899/


# update frontend idls
rm app/src/lib/idl/draffle.json && rm app/src/lib/idl/draffle.ts
cp target/idl/draffle.json app/src/lib/idl/draffle.json && cp target/types/draffle.ts app/src/lib/idl/draffle.ts