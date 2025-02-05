<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <html>
            <head>
                <title>Gestion de Stock</title>
                <style>
                    table { width: 80%; margin: auto; border-collapse: collapse; border: 1px solid black; }
                    th, td { padding: 10px; border: 1px solid black; text-align: center; }
                    th { background-color: #007bff; color: white; }
                    
                </style>
            </head>
            <body>
                <h1 style="text-align: center; color: #007bff">Liste des produits</h1>
                <table border="1">
                    <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>description</th>
                        <th>quantite</th>
                        <th>prix</th>
                        <th>categorie</th>
                    </tr>
                    <xsl:for-each select="stock/produit">
                        <tr>
                            <td><xsl:value-of select="@id"/></td>
                            <td><xsl:value-of select="nom"/></td>
                            <td><xsl:value-of select="description"/></td>
                            <td><xsl:value-of select="quantite"/></td>
                            <td><xsl:value-of select="prix"/></td>
                            <td><xsl:value-of select="categorie"/></td>
                        </tr>
                    </xsl:for-each>
                </table>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
