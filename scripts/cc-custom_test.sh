echo "------------------\n"
export SCRIPT_PATH="/Users/nagy/Files/CryptoCoders/draffle/scripts"
export ROOT_PATH="/Users/nagy/Files/CryptoCoders/draffle"
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
COMMUNITY_STAKING_PROGRAM_ID="$(solana address -k ${SCRIPT_PATH}/../target/deploy/community_staking-keypair.json)"
DISPENSER_PROGRAM_ID="$(solana address -k ${SCRIPT_PATH}/../target/deploy/dispenser-keypair.json)"

echo "\n-------------"
echo "DRAFFLE PROGRAM ID"
echo $DRAFFLE_PROGRAM_ID
echo "COMMUNITY_STAKING_PROGRAM_ID"
echo $COMMUNITY_STAKING_PROGRAM_ID
echo "DISPENSER_PROGRAM_ID"
echo $DISPENSER_PROGRAM_ID

##############################
echo "Setting cluster to localnet..."
solana config set --url http://127.0.0.1:8899
echo "Done"

##############################
echo "Getting accounts addresses..."
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
TEST_USER_ADDRESS="$(solana address -k ${SCRIPT_PATH}/sample_accounts/user1-keypair.json)"
echo "${TEST_USER_ADDRESS}"
MINT1_FAUCET_ADDRESS="$(solana address -k ${SCRIPT_PATH}/sample_accounts/user2-keypair.json)"
echo "${MINT1_FAUCET_ADDRESS}"
WSOL=So11111111111111111111111111111111111111112
echo "Done"

##############################
echo "Creating sample mints, accounts, and funding them..."
spl-token create-token ${SCRIPT_PATH}/sample_accounts/prize-nft1-keypair.json --decimals 0
spl-token create-account ${NFT1_ADDRESS}
spl-token mint ${NFT1_ADDRESS} 1

spl-token create-token ${SCRIPT_PATH}/sample_accounts/prize-nft2-keypair.json --decimals 0
spl-token create-account ${NFT2_ADDRESS}
spl-token mint ${NFT2_ADDRESS} 1

spl-token create-token ${SCRIPT_PATH}/sample_accounts/prize-nft3-keypair.json --decimals 0
spl-token create-account ${NFT3_ADDRESS}
spl-token mint ${NFT3_ADDRESS} 1

spl-token create-token ${SCRIPT_PATH}/sample_accounts/prize-nft4-keypair.json --decimals 0
spl-token create-account ${NFT4_ADDRESS}
spl-token mint ${NFT4_ADDRESS} 1

spl-token create-token ${SCRIPT_PATH}/sample_accounts/prize-nft5-keypair.json --decimals 0
spl-token create-account ${NFT5_ADDRESS}
spl-token mint ${NFT5_ADDRESS} 1

spl-token create-token ${SCRIPT_PATH}/sample_accounts/dev-mint-keypair.json --decimals 6
spl-token create-account ${MINT1_ADDRESS}
spl-token mint ${MINT1_ADDRESS} 3000000

spl-token create-token ${SCRIPT_PATH}/sample_accounts/prize-mint1-keypair.json --decimals 0
spl-token create-account ${MINT2_ADDRESS}
spl-token mint ${MINT2_ADDRESS} 30000

spl-token create-token ${SCRIPT_PATH}/sample_accounts/prize-mint2-keypair.json --decimals 2
spl-token create-account ${MINT3_ADDRESS}
spl-token mint ${MINT3_ADDRESS} 30000

solana airdrop 10000
solana transfer --allow-unfunded-recipient ${TEST_USER_ADDRESS} 0.1
solana transfer --allow-unfunded-recipient ${MINT1_FAUCET_ADDRESS} 5

spl-token transfer --allow-unfunded-recipient --fund-recipient  ${MINT1_ADDRESS} 3 ${TEST_USER_ADDRESS}
spl-token transfer --allow-unfunded-recipient --fund-recipient  ${MINT1_ADDRESS} 3 ${MINT1_FAUCET_ADDRESS}
echo "Done"

##############################
echo "Creating sample raffles..."
cd ${ROOT_PATH}
cargo build
# target/debug/draffle create-raffle ${MINT1_ADDRESS} 500000 "2022-04-02 23:35" /Users/nagy/Files/CryptoCoders/draffle/scripts/sample_accounts/raffle/entrants1-keypair.json
${SCRIPT_PATH}/../target/debug/draffle create-raffle ${MINT1_ADDRESS} 500000 "$(cdate --utc -d "+2 minute" '+%Y-%m-%d %H:%M')" "${SCRIPT_PATH}/sample_accounts/raffle/entrants1-keypair.json" # BQ2CVceaCP5HSNGeByWit2a5KCKRMGzRPuX2KRKbS9HE
${SCRIPT_PATH}/../target/debug/draffle add-prize BQ2CVceaCP5HSNGeByWit2a5KCKRMGzRPuX2KRKbS9HE ${MINT2_ADDRESS} 25 0 #####THIS FUCKING ERRORS OUT
${SCRIPT_PATH}/../target/debug/draffle add-prize BQ2CVceaCP5HSNGeByWit2a5KCKRMGzRPuX2KRKbS9HE ${NFT1_ADDRESS} 1 1
${SCRIPT_PATH}/../target/debug/draffle add-prize BQ2CVceaCP5HSNGeByWit2a5KCKRMGzRPuX2KRKbS9HE ${MINT3_ADDRESS} 334 2
${SCRIPT_PATH}/../target/debug/draffle add-prize BQ2CVceaCP5HSNGeByWit2a5KCKRMGzRPuX2KRKbS9HE ${NFT4_ADDRESS} 1 3
${SCRIPT_PATH}/../target/debug/draffle add-prize BQ2CVceaCP5HSNGeByWit2a5KCKRMGzRPuX2KRKbS9HE ${MINT3_ADDRESS} 12300 4

##############################
echo "Creating sample NFT metadata with URLs REACT_APP_URL=${REACT_APP_URL} and REACT_APP_RPC_ENDPOINT=${REACT_APP_RPC_ENDPOINT}"
RUST_BACKTRACE=full ${SCRIPT_PATH}/metaplex-token-metadata-test-client create_metadata_accounts --name "Degen Ape #1" --symbol "DA" --uri "${REACT_APP_URL}/nfts/degenApe1.json" --url "${REACT_APP_RPC_ENDPOINT}" --mint "${SCRIPT_PATH}/sample_accounts/prize-nft1-keypair.json" --keypair ~/.config/solana/id.json



### TEST VALIDATOR
## need to add the custom programs to the test validator this way - clone from mainnet-beta
solana-test-validator \
--bpf-program 5tA54UMYd1tBSJ2VTaUBFE7mWZsM3n1pPucMyzvguQU1 target/deploy/draffle.so \
--bpf-program metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s scripts/metaplex_token_metadata.so \
--clone H6ARHf6YXhGYeQfUzQNGk6rDNnLBQKrenN712K4AQJEG \
--clone GVXRSBjFk6e6J3NbVPXohDJetcTjaeeuykUpbQF8UoMU \
--clone 3NBReDRTLKMQEKiLD5tGcx4kXbTf88b7f2xLS9UuGjym \
--url mainnet-beta

solana-test-validator \
--bpf-program 5tA54UMYd1tBSJ2VTaUBFE7mWZsM3n1pPucMyzvguQU1 target/deploy/draffle.so \
--bpf-program 56zQMVdReF9VTm4E2gqXPC7Z44Rqq5YsSUHVeKGhPYVv target/deploy/community_staking.so \
--bpf-program Af1FcsjwEmJQ9E1nKhsDmFMvvE8wjrLW3FRAXjzCAaMR target/deploy/dispenser.so \
--bpf-program metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s scripts/metaplex_token_metadata.so \
--clone H6ARHf6YXhGYeQfUzQNGk6rDNnLBQKrenN712K4AQJEG \
--clone GVXRSBjFk6e6J3NbVPXohDJetcTjaeeuykUpbQF8UoMU \
--clone 3NBReDRTLKMQEKiLD5tGcx4kXbTf88b7f2xLS9UuGjym \
--url devnet