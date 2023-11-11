db.createUser(
        {
            user: "rdinfo",
            pwd: "",
            roles: [
                {
                    role: "readWrite",
                    db: "rdinfodb"
                }
            ]
        }
);

db.users.insert({"login": "admin", "password": "$2a$10$ebsiP4OSrcnv0f00P9pe3usyATqtTub4dvhA1tAxzgExir/fKuxJe"})
