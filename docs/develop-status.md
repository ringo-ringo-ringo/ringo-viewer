# develop status

| file                                                     | info                                         | status                                            |
| -------------------------------------------------------- | -------------------------------------------- | ------------------------------------------------- |
| CONFIG file                                              | シミュレーションやいろんな設定情報が入ってる | only kernel.timesteps(そのステップの最大ステップ) |
| START_OF_LOG file                                        |                                              | ok                                                |
| END_OF_LOG file                                          |                                              | ok                                                |
| INITIAL_CONDITIONS file                                  | 0 ステップ目の情報                           | ok                                                |
| UPDATES file                                             | 前ステップからの差分情報                     | ok                                                |
| COMMANDS file                                            | 発行されたコマンド                           | no                                                |
| PERCEPTION file -> visible                               | 知覚情報                                     | ok                                                |
| PERCEPTION file -> communication -> MessageAmbulanceTeam |                                              | ok                                                |
| PERCEPTION file -> communication -> MessageBuilding      |                                              | ng                                                |
| PERCEPTION file -> communication -> MessageCivilian      |                                              | ok                                                |
| PERCEPTION file -> communication -> MessageFireBrigade   |                                              | ok                                                |
| PERCEPTION file -> communication -> MessagePoliceForce   |                                              | ok                                                |
| PERCEPTION file -> communication -> CommandAmbulance     |                                              | ng                                                |
| PERCEPTION file -> communication -> CommandFire          |                                              | ng                                                |
| PERCEPTION file -> communication -> CommandPolice        |                                              | ok                                                |
| PERCEPTION file -> communication -> CommandScout         |                                              | ng                                                |
| PERCEPTION file -> communication -> MessageReport        |                                              | ng                                                |
