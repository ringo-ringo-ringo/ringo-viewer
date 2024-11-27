# develop status

| file                                                     | info                                         | status                                            |
| -------------------------------------------------------- | -------------------------------------------- | ------------------------------------------------- |
| CONFIG file                                              | シミュレーションやいろんな設定情報が入ってる | only kernel.timesteps(そのステップの最大ステップ) |
| START_OF_LOG file                                        |                                              | ○                                                 |
| END_OF_LOG file                                          |                                              | ○                                                 |
| INITIAL_CONDITIONS file                                  | 0 ステップ目の情報                           | ○                                                 |
| UPDATES file                                             | 前ステップからの差分情報                     | ○                                                 |
| COMMANDS file                                            | 発行されたコマンド                           | △                                                 |
| PERCEPTION file -> visible                               | 見た情報                                     | ○                                                 |
| PERCEPTION file -> communication -> MessageAmbulanceTeam |                                              | △                                                 |
| PERCEPTION file -> communication -> MessageBuilding      |                                              | ×                                                 |
| PERCEPTION file -> communication -> MessageCivilian      |                                              | △                                                 |
| PERCEPTION file -> communication -> MessageFireBrigade   |                                              | △                                                 |
| PERCEPTION file -> communication -> MessagePoliceForce   |                                              | △                                                 |
| PERCEPTION file -> communication -> CommandAmbulance     |                                              | ×                                                 |
| PERCEPTION file -> communication -> CommandFire          |                                              | ×                                                 |
| PERCEPTION file -> communication -> CommandPolice        |                                              | △                                                 |
| PERCEPTION file -> communication -> CommandScout         |                                              | ×                                                 |
| PERCEPTION file -> communication -> MessageReport        |                                              | ×                                                 |


COMMANDSファイルとPERCEPTIONファイル内にあるAK_SPEAK内の一部の通信を処理しきれていません